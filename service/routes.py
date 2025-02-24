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

# Todo: Place your REST API code here ...
@app.route("/api/v1/createPromotion", methods=["POST"])
def create_promotion():
    try:
        data = request.get_json()
        #print(f"data - {data}")
        promotion = Promotion()
        promotion.deserialize(data)
        if promotion.name != None:
            try:
                assert type(promotion.name) == str
            except AssertionError as e:             
                return jsonify({"error": "Promotion name must be a str"}), 400
        
        if promotion.category != None:
            if not isinstance(promotion.category, Category):
                return jsonify({"error": "Promotion category must be a Category object"}), 400
            # try:
            #     print(f"type of category - {type(promotion.category)}")
            #     assert type(promotion.category) == Category
            # except AssertionError as e:            
            #     return jsonify({"error": "Promotion category must be a Category object"}), 400
            
        if promotion.discount_x != None:
            try:
                assert type(promotion.discount_x) == int
            except AssertionError as e:               
                return jsonify({"error": "Promotion discount x must be int"}), 400
        
        if promotion.discount_y != None:
            try:
                assert type(promotion.discount_y) == int
            except AssertionError as e:           
                return jsonify({"error": "Promotion discount y must be int"}), 400
            
        
        if promotion.product_id == None:
            return jsonify({"error": "Product ID must be present"}), 500
        try:
            assert type(promotion.product_id) == int
        except AssertionError as e:            
            return jsonify({"error": "Promotion product id must be int"}), 400

        if promotion.description == None:
            return jsonify({"error": "Product Description must be present"}), 500
        try:
            assert type(promotion.description) == str
        except AssertionError as e:               
            return jsonify({"error": "Promotion description must be str"}), 400
            
        if promotion.validity != None:
            try:
                assert type(promotion.validity) == bool
            except AssertionError as e:              
                return jsonify({"error": "Promotion validity must be bool"}), 400
            
        if promotion.start_date != None:
            try:
                #assert type(promotion.start_date) == date
                datetime.strptime(promotion.start_date, "%Y-%m-%d")
            except AssertionError as e:    
                print("here")           
                return jsonify({"error": "Promotion start date must be in YYYY-MM-DD format"}), 400

        if promotion.end_date != None:
            try:
                #assert type(promotion.end_date) == date
                datetime.strptime(promotion.end_date, "%Y-%m-%d")
            except AssertionError as e:             
                return jsonify({"error": "Promotion end date must be YYYY-MM-DD format"}), 400
        promotion.create()
        return jsonify(promotion.serialize()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500