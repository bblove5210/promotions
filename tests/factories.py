"""
Test Factory to make fake objects for testing
"""

from datetime import date

import factory
from factory.fuzzy import FuzzyChoice, FuzzyDate, FuzzyText, FuzzyInteger
from service.models import Promotion, Category


class PromotionFactory(factory.Factory):
    """Creates fake promotions"""

    class Meta:  # pylint: disable=too-few-public-methods
        """Maps factory to data model"""

        model = Promotion

    id = factory.Sequence(lambda n: n)
    name = FuzzyText(length=63)
    category = FuzzyChoice(
        choices=[
            Category.UNKNOWN,
            Category.PERCENTAGE_DISCOUNT_X,
            Category.SPEND_X_SAVE_Y,
            Category.BUY_X_GET_Y_FREE,
        ]
    )
    product_id = factory.Sequence(lambda n: n)
    description = FuzzyText(length=256)
    validity = FuzzyChoice(choices=[True, False])
    discount_x = FuzzyInteger(0, 100)
    discount_y = FuzzyChoice([None, FuzzyInteger(0, 100).fuzz()])
    start_date = FuzzyDate(date(2008, 1, 1), date(2016, 1, 1))
    end_date = FuzzyDate(date(2016, 1, 1))
