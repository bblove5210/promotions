######################################################################
# Copyright 2016, 2024 John J. Rofrano. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
######################################################################

"""
Promotion Service

This service implements a REST API that allows you to Create, Read, Update
and Delete Promotion
"""

from datetime import datetime, date
from flask import jsonify, request, url_for, abort
from flask import current_app as app  # Import Flask application
from service.models import Promotion, Category
from service.common import status  # HTTP Status Codes

######################################################################
# GET INDEX
######################################################################


@app.route("/")
def index():
    """Root URL response"""
    app.logger.info("Request for Root URL")
    return (
        jsonify(
            name="Promotion REST API Service",
            version="1.0",
            paths=url_for("list_promotions", _external=True),
        ),
        status.HTTP_200_OK,
    )


######################################################################
#  R E S T   A P I   E N D P O I N T S
######################################################################


@app.route("/promotions", methods=["POST"])
def create_promotions():
    """
    POST API to create a new promotion.
    Product ID and Promotion Description have to be present, the rest of them have default values.
    """
    app.logger.info("Request to Create a Promotion...")
    check_content_type("application/json")

    promotion = Promotion()
    data = request.get_json()
    app.logger.info("Processing: %s", data)
    promotion.deserialize(data)

    promotion.create()
    app.logger.info("Promotion with new id [%s] saved", promotion.id)

    location_url = url_for("get_promotions", promotion_id=promotion.id, _external=True)
    return (
        jsonify(promotion.serialize()),
        status.HTTP_201_CREATED,
        {"Location": location_url},
    )


# ----------------------
#    READ A PROMOTION
# ----------------------
@app.route("/promotions/<int:promotion_id>", methods=["GET"])
def get_promotions(promotion_id):
    """GET API to read a promotion"""
    app.logger.info("Request to Retrieve a promotion with id [%s]", promotion_id)

    # Attempt to find the promotion and abort if not found
    promotion = Promotion.find(promotion_id)
    if not promotion:
        abort(
            status.HTTP_404_NOT_FOUND,
            f"promotion with id '{promotion_id}' was not found.",
        )

    app.logger.info("Returning promotion: %s", promotion.name)
    return jsonify(promotion.serialize()), status.HTTP_200_OK


@app.route("/promotions", methods=["GET"])
def list_promotions():
    """
    GET API to list all promotions.
    """
    app.logger.info("Request to list Promotions...")

    name = request.args.get("name")
    validity = request.args.get("validity")
    category = request.args.get("category")
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    product_id = request.args.get("product_id")

    if name:
        app.logger.info("find by name: %s", name)
        promotions = Promotion.find_by_name(name)
    elif validity:
        app.logger.info("find by validity: %s", validity)
        validity_value = validity.lower() in ["true", "yes", "1"]
        promotions = Promotion.find_by_validity(validity_value)
    elif category:
        app.logger.info("find by category: %s", category)
        promotions = Promotion.find_by_category(Category[category.upper()])
    elif start_date:
        app.logger.info("find by start_date: %s", start_date)
        start_date = datetime.fromisoformat(start_date)
        promotions = Promotion.find_by_start_date(start_date)
    elif end_date:
        app.logger.info("find by end_date: %s", end_date)
        end_date = datetime.fromisoformat(end_date)
        promotions = Promotion.find_by_end_date(end_date)
    elif product_id:
        app.logger.info("find by product_id: %d", product_id)
        promotions = Promotion.find_by_product_id(int(product_id))
    else:
        promotions = Promotion.all()

    promotion_list = [promo.serialize() for promo in promotions]

    return jsonify(promotion_list), status.HTTP_200_OK


@app.route("/promotions/<int:promotion_id>", methods=["PUT"])
def update_promotions(promotion_id):
    """
    Update a promotion

    This endpoint will update a promotion based the body that is posted
    """
    app.logger.info("Request to Update a promotion with id [%s]", promotion_id)
    check_content_type("application/json")

    # Attempt to find the promotion and abort if not found
    promotion = Promotion.find(promotion_id)
    if not promotion:
        abort(
            status.HTTP_404_NOT_FOUND,
            f"promotion with id '{promotion_id}' was not found.",
        )

    # Update the promotion with the new data
    data = request.get_json()
    app.logger.info("Processing: %s", data)
    promotion.deserialize(data)

    # Save the updates to the database
    promotion.update()

    app.logger.info("promotion with ID: %d updated.", promotion.id)
    return jsonify(promotion.serialize()), status.HTTP_200_OK


@app.route("/promotions/<int:promotion_id>/valid", methods=["PUT", "DELETE"])
def validate_promotions(promotion_id):
    """Changing the validity of the Promotion to valid or invalid"""
    app.logger.info(
        "Request to change the validity of promotion with id %d to %s",
        promotion_id,
        ("valid" if request.method == "PUT" else "invalid"),
    )

    promotion = Promotion.find(promotion_id)
    if not promotion:
        abort(
            status.HTTP_404_NOT_FOUND,
            f"Promotion with id '{promotion_id}' was not found.",
        )

    if request.method == "PUT":
        promotion.validity = True
    else:
        promotion.validity = False

    promotion.update()

    app.logger.info(
        "Promotion with ID: %d has been %s",
        promotion_id,
        ("validated" if request.method == "PUT" else "invalidated"),
    )
    return promotion.serialize(), status.HTTP_200_OK


@app.route("/promotions/<int:promotion_id>/extend", methods=["PUT"])
def extend_promotions(promotion_id):
    """Change the end_date of the given promotion to the date specified in the payload"""
    app.logger.info(
        "Request to change the end_date of promotion with id %d", promotion_id
    )

    check_content_type("application/json")
    promotion = Promotion.find(promotion_id)
    if not promotion:
        abort(
            status.HTTP_404_NOT_FOUND,
            f"promotion with id '{promotion_id}' was not found.",
        )

    data = request.get_json()
    if "end_date" not in data:
        abort(status.HTTP_400_BAD_REQUEST, "application/json does not contain end_date")

    new_date = date.fromisoformat(data["end_date"])
    if new_date < promotion.start_date:
        abort(status.HTTP_400_BAD_REQUEST, "new end_date is before start_date")

    promotion.end_date = new_date
    promotion.update()

    return promotion.serialize(), status.HTTP_200_OK


#####################################################################
# Checks the ContentType of a request
######################################################################


def check_content_type(content_type) -> None:
    """Checks that the media type is correct"""
    if "Content-Type" not in request.headers:
        app.logger.error("No Content-Type specified.")
        abort(
            status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            f"Content-Type must be {content_type}",
        )

    if request.headers["Content-Type"] == content_type:
        return

    app.logger.error("Invalid Content-Type: %s", request.headers["Content-Type"])
    abort(
        status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
        f"Content-Type must be {content_type}",
    )


######################################################################
# Delete a Promotion
######################################################################
@app.route("/promotions/<int:promotion_id>", methods=["DELETE"])
def delete_promotions(promotion_id):
    """
    Delete a Promotion

    This endpoint will delete a Promotion based the id specified in the path
    """
    app.logger.info("Request to Delete a promotion with id [%s]", promotion_id)
    promotion = Promotion()
    promotion = Promotion.find(promotion_id)

    if promotion:
        promotion.delete()

    return {}, status.HTTP_204_NO_CONTENT


######################################################################
# Health Check
######################################################################
@app.route("/health", methods=["GET"])
def health():
    """Health Check
    This endpoint returns a 200 response if the service is running
    """
    app.logger.info("Request for Health Check")
    return (
        jsonify(status="OK"),
        status.HTTP_200_OK,
    )
