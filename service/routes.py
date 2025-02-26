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

from flask import jsonify, request, url_for, abort
from flask import current_app as app  # Import Flask application
from service.models import Promotion, Category
from service.common import status  # HTTP Status Codes
from flask import Blueprint, request, jsonify
from service.models import Promotion, DataValidationError
from datetime import datetime, date

######################################################################
# GET INDEX
######################################################################
@app.route("/")
def index():
    """Root URL response"""
    return (
        "Reminder: return some useful information in json format about the service here",
        status.HTTP_200_OK,
    )


######################################################################
#  R E S T   A P I   E N D P O I N T S
######################################################################

##----------------------------------------------------------------------------##

@app.route("/promotions", methods=["POST"])
def create_promotions():
    """
    POST API to create a new promotion.
    Product ID and Promotion Description have to be present, the rest of them have default values.
    """
    try:
        data = request.get_json()
        promotion = Promotion()
        
        promotion.deserialize(data)
        
        if promotion.name != None:
            if not isinstance(promotion.name, str):       
                return jsonify({"error": "Promotion name must be a str"}), 400
        
        if promotion.category != None:
            if not isinstance(promotion.category, Category):
                return jsonify({"error": "Promotion category must be a Category object"}), 400
            
        if promotion.discount_x != None:
            if not isinstance(promotion.discount_x, int):
                return jsonify({"error": "Promotion discount x must be int"}), 400
        
        if promotion.discount_y != None:
            if not isinstance(promotion.discount_y, int):
                return jsonify({"error": "Promotion discount y must be int"}), 400
            
        
        if promotion.product_id == None:
            return jsonify({"error": "Product ID must be present"}), 500
        else:
            if not isinstance(promotion.product_id, int):
                return jsonify({"error": "Promotion product id must be int"}), 400

        if promotion.description == None:
            return jsonify({"error": "Promotion Description must be present"}), 500
        else:
            if not isinstance(promotion.description, str):
                return jsonify({"error": "Promotion product description must be str"}), 400
            
        if promotion.validity != None:
            if not isinstance(promotion.validity, bool):
                return jsonify({"error": "Promotion validity must be bool"}), 400
            
        if promotion.start_date != None:
            if not isinstance(promotion.start_date, date):
                return jsonify({"error": "Promotion start date must be in YYYY-MM-DD format"}), 400

        if promotion.end_date != None:
            if not isinstance(promotion.end_date, date):
                return jsonify({"error": "Promotion end date must be in YYYY-MM-DD format"}), 400
            
        promotion.create()
        return jsonify(promotion.serialize()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    ##----------------------------------------------------------------------------##