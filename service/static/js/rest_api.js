$(function () {

    // ****************************************
    //  U T I L I T Y   F U N C T I O N S
    // ****************************************

    // Updates the form with data from the response
    function update_form_data(res) {
        $("#promotion_id").val(res.id);
        $("#promotion_name").val(res.name);
        if (res.validity == true) {
            $("#promotion_validity").val("true");
        } else {
            $("#promotion_validity").val("false");
        }
        $("#promotion_discount_x").val(res.discount_x);
        if (res.product_id === null) {
            $("#promotion_discount_y").val("")
        } else {
            $("#promotion_discount_y").val(res.discount_y)
        }
        $("#promotion_category").val(res.category);
        $("#promotion_description").val(res.description);
        $("#promotion_product_id").val(res.product_id);
        $("#promotion_start_date").val(res.start_date);
        $("#promotion_end_date").val(res.end_date)
    }

    /// Clears all form fields
    function clear_form_data() {
        $("#promotion_id").val("");
        $("#promotion_name").val("");
        $("#promotion_category").val("");
        $("#promotion_validity").val("");
        $("#promotion_discount_x").val("");
        $("#promotion_discount_y").val("")
        $("#promotion_description").val("");
        $("#promotion_product_id").val("");
        $("#promotion_start_date").val("");
        $("#promotion_end_date").val("")
    }

    // Updates the flash message area
    function flash_message(message) {
        $("#flash_message").empty();
        $("#flash_message").append(message);
    }

    // ****************************************
    // Create a Promotion
    // ****************************************

    $("#create-btn").click(function () {

        let name = $("#promotion_name").val();
        let category = $("#promotion_category").val();
        let discount_x = Math.floor($("#promotion_discount_x").prop("valueAsNumber"));
        let discount_y = Math.floor($("#promotion_discount_y").prop("valueAsNumber"));
        let description = $("#promotion_description").val();
        let product_id = Math.floor($("#promotion_product_id").prop("valueAsNumber"));
        let validity = $("#promotion_validity").val() == "true";
        let start_date = $("#promotion_start_date").val();
        let end_date = $("#promotion_end_date").val();

        let data = {
            "name": name,
            "category": category,
            "discount_x": discount_x,
            "discount_y": discount_y,
            "description": description,
            "product_id": product_id,
            "validity": validity,
            "start_date": start_date,
            "end_date": end_date,
        };

        $("#flash_message").empty();

        let ajax = $.ajax({
            type: "POST",
            url: "/api/promotions",
            contentType: "application/json",
            data: JSON.stringify(data),
        });

        ajax.done(function (res) {
            update_form_data(res)
            flash_message("Success")
        });

        ajax.fail(function (res) {
            flash_message(res.responseJSON.message)
        });
    });


    // ****************************************
    // Update a Promotion
    // ****************************************

    $("#update-btn").click(function () {

        let promotion_id = $("#promotion_id").val();
        let name = $("#promotion_name").val();
        let category = $("#promotion_category").val();
        let discount_x = Math.floor($("#promotion_discount_x").prop("valueAsNumber"));
        let discount_y = Math.floor($("#promotion_discount_y").prop("valueAsNumber"));
        let description = $("#promotion_description").val();
        let product_id = Math.floor($("#promotion_product_id").prop("valueAsNumber"));
        let validity = $("#promotion_validity").val() == "true";
        let start_date = $("#promotion_start_date").val();
        let end_date = $("#promotion_end_date").val();

        let data = {
            "name": name,
            "category": category,
            "discount_x": discount_x,
            "discount_y": discount_y,
            "description": description,
            "product_id": product_id,
            "validity": validity,
            "start_date": start_date,
            "end_date": end_date,
        };

        $("#flash_message").empty();

        let ajax = $.ajax({
            type: "PUT",
            url: `/api/promotions/${promotion_id}`,
            contentType: "application/json",
            data: JSON.stringify(data)
        })

        ajax.done(function (res) {
            update_form_data(res)
            flash_message("Success")
        });

        ajax.fail(function (res) {
            flash_message(res.responseJSON.message)
        });

    });

    // ****************************************
    // Retrieve a Promotion
    // ****************************************

    $("#retrieve-btn").click(function () {

        let promotion_id = $("#promotion_id").val();

        $("#flash_message").empty();

        let ajax = $.ajax({
            type: "GET",
            url: `/api/promotions/${promotion_id}`,
            contentType: "application/json",
            data: ''
        })

        ajax.done(function (res) {
            //alert(res.toSource())
            update_form_data(res)
            flash_message("Success")
        });

        ajax.fail(function (res) {
            clear_form_data()
            flash_message(res.responseJSON.message)
        });

    });

    // ****************************************
    // Delete a Promotion
    // ****************************************

    $("#delete-btn").click(function () {

        let promotion_id = $("#promotion_id").val();

        $("#flash_message").empty();

        let ajax = $.ajax({
            type: "DELETE",
            url: `/api/promotions/${promotion_id}`,
            contentType: "application/json",
            data: '',
        })

        ajax.done(function (res) {
            clear_form_data()
            flash_message("Promotion has been Deleted!")
        });

        ajax.fail(function (res) {
            flash_message("Server error!")
        });
    });

    // ****************************************
    // Clear the form
    // ****************************************

    $("#clear-btn").click(function () {
        $("#promotion_id").val("");
        $("#flash_message").empty();
        clear_form_data()
    });

    // ****************************************
    // Search for a Promotion
    // ****************************************

    $("#search-btn").click(function () {

        let name = $("#promotion_name").val();
        let category = $("#promotion_category").val();
        let product_id = Math.floor($("#promotion_product_id").prop("valueAsNumber"));
        let validity = $("#promotion_validity").val() == "true";
        let start_date = $("#promotion_start_date").val();
        let end_date = $("#promotion_end_date").val();

        let queryString = ""

        if (name) {
            queryString += 'name=' + name
        }
        if (category) {
            if (queryString.length > 0) {
                queryString += '&category=' + category
            } else {
                queryString += 'category=' + category
            }
        }
        if (product_id) {
            if (queryString.length > 0) {
                queryString += '&product_id=' + product_id
            } else {
                queryString += 'product_id=' + product_id
            }
        }
        if (validity) {
            if (queryString.length > 0) {
                queryString += '&validity=' + validity
            } else {
                queryString += 'validity=' + validity
            }
        }
        if (start_date) {
            if (queryString.length > 0) {
                queryString += '&start_date=' + start_date
            } else {
                queryString += 'start_date=' + start_date
            }
        }
        if (end_date) {
            if (queryString.length > 0) {
                queryString += '&end_date=' + end_date
            } else {
                queryString += 'end_date=' + end_date
            }
        }

        $("#flash_message").empty();

        let ajax = $.ajax({
            type: "GET",
            url: `/api/promotions?${queryString}`,
            contentType: "application/json",
            data: ''
        })

        ajax.done(function (res) {
            //alert(res.toSource())
            $("#search_results").empty();
            let table = '<table class="table table-striped" cellpadding="10">'
            table += '<thead><tr>'
            table += '<th class="col-md-2">ID</th>'
            table += '<th class="col-md-2">Name</th>'
            table += '<th class="col-md-2">Type</th>'
            table += '<th class="col-md-2">Product ID</th>'
            table += '<th class="col-md-2">Validity</th>'
            table += '<th class="col-md-2">Start Date</th>'
            table += '<th class="col-md-2">End Date</th>'
            table += '<th class="col-md-2">Description</th>'
            table += '</tr></thead><tbody>'
            let firstPromotion = "";
            for (let i = 0; i < res.length; i++) {
                let promotion = res[i];
                let type = "";
                if (promotion.category === "SPEND_X_SAVE_Y") {
                    type = `Spend ${promotion.discount_x} Save ${promotion.discount_y}`
                } else if (promotion.category === "BUY_X_GET_Y_FREE") {
                    type = `Buy ${promotion.discount_x} Get ${promotion.discount_y} Free`
                } else if (promotion.category === "PERCENTAGE_DISCOUNT_X") {
                    type = `${promotion.discount_x}% off`
                } else {
                    type = `Unknown`
                }
                table += `<tr id="row_${i}"><td>${promotion.id}</td><td>${promotion.name}</td><td>${type}</td><td>${promotion.product_id}</td><td>${promotion.validity}</td><td>${promotion.start_date}</td><td>${promotion.end_date}</td><td>${promotion.description}</td></tr>`;
                if (i == 0) {
                    firstPromotion = promotion;
                }
            }
            table += '</tbody></table>';
            $("#search_results").append(table);

            // copy the first result to the form
            if (firstPromotion != "") {
                update_form_data(firstPromotion)
            }

            flash_message("Success")
        });

        ajax.fail(function (res) {
            flash_message(res.responseJSON.message)
        });

    });

    // ****************************************
    // Validate a Promotion
    // ****************************************
    $("#validate-btn").click(function () {

        let promotion_id = $("#promotion_id").val();

        let ajax = $.ajax({
            type: "PUT",
            url: `/api/promotions/${promotion_id}/valid`,
            contentType: "application/json",
            data: '',
        })

        ajax.done(function (res) {
            //alert(res.toSource())
            update_form_data(res)
            flash_message("Success")
        });

        ajax.fail(function (res) {
            clear_form_data()
            flash_message(res.responseJSON.message)
        });

    });

    // ****************************************
    // Invalidate a Promotion
    // ****************************************
    $("#invalidate-btn").click(function () {

        let promotion_id = $("#promotion_id").val();

        let ajax = $.ajax({
            type: "DELETE",
            url: `/api/promotions/${promotion_id}/valid`,
            contentType: "application/json",
            data: '',
        })

        ajax.done(function (res) {
            //alert(res.toSource())
            update_form_data(res)
            flash_message("Success")
        });

        ajax.fail(function (res) {
            clear_form_data()
            flash_message(res.responseJSON.message)
        });

    });

    // ****************************************
    // Extend a Promotion
    // ****************************************
    $("#extend-btn").click(function () {

        let promotion_id = $("#promotion_id").val();

        let end_date = $("#promotion_end_date").val();

        let data = {
            "end_date": end_date,
        };

        let ajax = $.ajax({
            type: "PUT",
            url: `/api/promotions/${promotion_id}/extend`,
            contentType: "application/json",
            data: JSON.stringify(data)
        })

        ajax.done(function (res) {
            //alert(res.toSource())
            update_form_data(res)
            flash_message("Success")
        });

        ajax.fail(function (res) {
            clear_form_data()
            flash_message(res.responseJSON.message)
        });

    });

})
