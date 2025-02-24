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
TestPromotion API Service Test Suite
"""

# pylint: disable=duplicate-code
import os
import logging
from unittest import TestCase
import json
import sys
sys.path.append('..')
from wsgi import app
from service.common import status
from service.models import db, Promotion

DATABASE_URI = os.getenv(
    "DATABASE_URI", "postgresql+psycopg://postgres:postgres@localhost:5432/testdb"
)


######################################################################
#  T E S T   C A S E S
######################################################################
# pylint: disable=too-many-public-methods
class TestYourResourceService(TestCase):
    """REST API Server Tests"""

    @classmethod
    def setUpClass(cls):
        """Run once before all tests"""
        app.config["TESTING"] = True
        app.config["DEBUG"] = False
        # Set up the test database
        app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
        app.logger.setLevel(logging.CRITICAL)
        app.app_context().push()

    @classmethod
    def tearDownClass(cls):
        """Run once after all tests"""
        db.session.close()

    def setUp(self):
        """Runs before each test"""
        self.client = app.test_client()
        db.session.query(Promotion).delete()  # clean up the last tests
        db.session.commit()

    def tearDown(self):
        """This runs after each test"""
        db.session.remove()

    ######################################################################
    #  P L A C E   T E S T   C A S E S   H E R E
    ######################################################################

    def test_index(self):
        """It should call the home page"""
        resp = self.client.get("/")
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    ##-------------------------------------------------------------------##

    def test_create_promotion_success(self):
        """
        Test case to create new promotion.
        """
        # Define the input payload for a valid promotion
        payload = {
            "name": "Summer Sale",
            "category": "PERCENTAGE_DISCOUNT_X",
            "discount_x": 20,
            "discount_y": 0,
            "product_id": 1,
            "description": "20% off summer sale",
            "validity": True,
            "start_date": "2025-06-01",
            "end_date": "2025-06-30"
        }
        # Post to the promotions endpoint
        response = self.client.post("/api/v1/createPromotion", json=payload)
        #print(response)
        self.assertEqual(response.status_code, 201)

    ##-------------------------------------------------------------------##

    def test_name_validation_create_promotion(self):
        """
        Test case to validate that name can only be a str.
        """
        # Define the input payload for a valid promotion
        payload = {
            "name": 1, # int
            "category": "PERCENTAGE_DISCOUNT_X",
            "discount_x": 20, 
            "discount_y": 0,
            "product_id": 1,
            "description": "20% off summer sale",
            "validity": True,
            "start_date": "2025-06-01",
            "end_date": "2025-06-30"
        }
        # Post to the promotions endpoint
        response = self.client.post("/api/v1/createPromotion", json=payload)
        #print(response)
        self.assertEqual(response.status_code, 400)

    ##-------------------------------------------------------------------##
    
    def test_category_validation_create_promotion(self):
        """
        Test case to validate that category can only be a Category obj.
        """
        # Define the input payload for a valid promotion
        payload = {
            "name": "Summer Sale",
            "category": "random_string", # not part of category
            "discount_x": 20, 
            "discount_y": 0,
            "product_id": 1,
            "description": "20% off summer sale",
            "validity": True,
            "start_date": "2025-06-01",
            "end_date": "2025-06-30"
        }
        # Post to the promotions endpoint
        response = self.client.post("/api/v1/createPromotion", json=payload)
        #print(response)
        self.assertEqual(response.status_code, 400)

    ##-------------------------------------------------------------------##
    
    def test_discount_x_validation_create_promotion(self):
        """
        Test case to validate that discount_x can only be an int.
        """
        # Define the input payload for a valid promotion
        payload = {
            "name": "Summer Sale",
            "category": "PERCENTAGE_DISCOUNT_X",
            "discount_x": "20", # string
            "discount_y": 0,
            "product_id": 1,
            "description": "20% off summer sale",
            "validity": True,
            "start_date": "2025-06-01",
            "end_date": "2025-06-30"
        }
        # Post to the promotions endpoint
        response = self.client.post("/api/v1/createPromotion", json=payload)
        #print(response)
        self.assertEqual(response.status_code, 400)

    ##-------------------------------------------------------------------##
    
    def test_discount_y_validation_create_promotion(self):
        """
        Test case to validate that discount_y can only be an int.
        """
        # Define the input payload for a valid promotion
        payload = {
            "name": "Summer Sale",
            "category": "PERCENTAGE_DISCOUNT_X",
            "discount_x": 20, 
            "discount_y": "0", # str
            "product_id": 1,
            "description": "20% off summer sale",
            "validity": True,
            "start_date": "2025-06-01",
            "end_date": "2025-06-30"
        }
        # Post to the promotions endpoint
        response = self.client.post("/api/v1/createPromotion", json=payload)
        #print(response)
        self.assertEqual(response.status_code, 400)

    ##-------------------------------------------------------------------##
    
    def test_product_id_validation_create_promotion(self):
        """
        Test case to validate that product_id can only be an int.
        """
        # Define the input payload for a valid promotion
        payload = {
            "name": "Summer Sale",
            "category": "PERCENTAGE_DISCOUNT_X",
            "discount_x": 20,
            "discount_y": 0,
            "product_id": "1", # str
            "description": "20% off summer sale",
            "validity": True,
            "start_date": "2025-06-01",
            "end_date": "2025-06-30"
        }
        # Post to the promotions endpoint
        response = self.client.post("/api/v1/createPromotion", json=payload)
        #print(response)
        self.assertEqual(response.status_code, 400)

    ##-------------------------------------------------------------------##

    def test_description_validation_create_promotion(self):
        """
        Test case to validate that description can only be a str.
        """
        # Define the input payload for a valid promotion
        payload = {
            "name": "Summer Sale",
            "category": "PERCENTAGE_DISCOUNT_X",
            "discount_x": 20, 
            "discount_y": 0,
            "product_id": 1,
            "description": 1, # ibt
            "validity": True,
            "start_date": "2025-06-01",
            "end_date": "2025-06-30"
        }
        # Post to the promotions endpoint
        response = self.client.post("/api/v1/createPromotion", json=payload)
        #print(response)
        self.assertEqual(response.status_code, 400)

    ##-------------------------------------------------------------------##

    def test_validity_validation_create_promotion(self):
        """
        Test case to validate that validity can only be a bool.
        """
        # Define the input payload for a valid promotion
        payload = {
            "name": "Summer Sale",
            "category": "PERCENTAGE_DISCOUNT_X",
            "discount_x": 20, 
            "discount_y": 0,
            "product_id": 1,
            "description": "20% off summer sale",
            "validity": "True", # str
            "start_date": "2025-06-01",
            "end_date": "2025-06-30"
        }
        # Post to the promotions endpoint
        response = self.client.post("/api/v1/createPromotion", json=payload)
        #print(response)
        self.assertEqual(response.status_code, 400)

    ##-------------------------------------------------------------------##

    def test_start_date_validation_create_promotion(self):
        """
        Test case to validate that start_date can only be in YYYY-MM-DD format.
        """
        # Define the input payload for a valid promotion
        payload = {
            "name": "Summer Sale",
            "category": "PERCENTAGE_DISCOUNT_X",
            "discount_x": 20,
            "discount_y": 0,
            "product_id": 1,
            "description": "20% off summer sale",
            "validity": True,
            "start_date": "23/2/2025", # some other date format
            "end_date": "2025-06-30"
        }
        # Post to the promotions endpoint
        response = self.client.post("/api/v1/createPromotion", json=payload)
        #print(response)
        self.assertEqual(response.status_code, 400)

    ##-------------------------------------------------------------------##

    def test_end_date_validation_create_promotion(self):
        """
        Test case to validate that end_date can only be in YYYY-MM-DD format.
        """
        # Define the input payload for a valid promotion
        payload = {
            "name": "Summer Sale",
            "category": "PERCENTAGE_DISCOUNT_X",
            "discount_x": 20,
            "discount_y": 0,
            "product_id": 1,
            "description": "20% off summer sale",
            "validity": True,
            "start_date": "2025-06-01",
            "end_date": "30/6/2025" # some other date format
        }
        # Post to the promotions endpoint
        response = self.client.post("/api/v1/createPromotion", json=payload)
        #print(response)
        self.assertEqual(response.status_code, 400)

    ##-------------------------------------------------------------------##

    def test_missing_product_id_create_promotion(self):
        """
        Test case to check missing product_id.
        """
        # Define the input payload for a valid promotion
        payload = {
            "name": "Summer Sale",
            "category": "PERCENTAGE_DISCOUNT_X",
            "discount_x": 20, 
            "discount_y": 0,
            #"product_id": 1,
            "description": "20% off summer sale",
            "validity": True,
            "start_date": "2025-06-01",
            "end_date": "2025-06-30"
        }
        # Post to the promotions endpoint
        response = self.client.post("/api/v1/createPromotion", json=payload)
        #print(response)
        self.assertEqual(response.status_code, 500)

    ##-------------------------------------------------------------------##

    def test_missing_product_description_create_promotion(self):
        """
        Test case to check missing product_description.
        """
        # Define the input payload for a valid promotion
        payload = {
            "name": "Summer Sale",
            "category": "PERCENTAGE_DISCOUNT_X",
            "discount_x": 20, 
            "discount_y": 0,
            "product_id": 1,
            #"description": "20% off summer sale",
            "validity": True,
            "start_date": "2025-06-01",
            "end_date": "2025-06-30"
        }
        # Post to the promotions endpoint
        response = self.client.post("/api/v1/createPromotion", json=payload)
        #print(response)
        self.assertEqual(response.status_code, 500)
    
    ##-------------------------------------------------------------------##


if __name__ == '__main__':
    unittest.main()