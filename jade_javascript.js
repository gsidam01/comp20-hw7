/* 
 * George Sidamon-Eristoff
 * 3 March 2020
 * Comp20 HW 7
 * jade_javascript.js
 */


/*
 * selected_quantity() iterates through the dropdown options to calculate
 *   subtotal, tax, and total and update the overall pricing breakdown
 * called each time the user changes any of the dropdown selections
 */
function selected_quantity(menuItems)
{
    document.getElementById("order_results").innerHTML = "";
    var total_cost = 0;
    for (let row = 1; row < 6; row++) {
        var quantity_coll_obj = document.getElementsByName("quan" + (row-1));
        var quantity = quantity_coll_obj.item(0).selectedIndex;
        quantity = parseInt(quantity);

        var table = document.getElementById("order_table");

        var cost = quantity * menuItems[(row-1)].cost;
        cost = cost.toFixed(2);
        table.rows[row].cells[3].innerHTML = cost;

        total_cost += parseFloat(cost);
    }

    document.getElementById("subtotal").value = total_cost;

    var tax = (total_cost * 0.0625).toFixed(2);
    document.getElementById("tax").value = tax;

    var overall_total = (total_cost * 0.0625 + total_cost).toFixed(2);
    document.getElementById("total").value = overall_total;
}


/*
 * validate() checks that the required fields are entered in the order form
 *   depending on the context, then either indicates errors to the client or
 *   prints a thank-you message and an order summary
 * potential errors: if client input in a text box seems legal to the client,
 *   but its not recognized as such by the program, then the client mighth
 *   become confused or angry
 */
function validate()
{
    event.preventDefault();
    var lname_good = true;
    var phone_good = true;
    var street_good = true;
    var city_good = true;

    var ok_to_submit = true;

/* Last Name */
    var lname_location = document.getElementsByName("lname").item(0);
    if (lname_location.value == "") {
        lname_good = false;
        ok_to_submit = false;
        lname_location.style.backgroundColor = "#ff7777";
    } else {
        lname_location.style.backgroundColor = "#ffffff";
    }

/* Phone */
    var phone_location = document.getElementById("phone");
    var phone_regex = /[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}$/g;

    if (phone_location.value == "") {
        phone_good = false;
    }
    if (phone_regex.test(phone_location.value) == false) {
        phone_good = false;
    }
    if(phone_good == false) {
        phone_location.style.backgroundColor = "#ff7777";
        ok_to_submit = false;
    } else {
        phone_location.style.backgroundColor = "#ffffff";
    }

/* Street */
    var street_location = document.getElementsByName("street").item(0);
    if (street_location.value == "") {
        street_good = false;
    }

/* City */
    var city_location = document.getElementsByName("city").item(0);
    if (city_location.value == "") {
        city_good = false;
    }

/* Pickup or Delivery */
    var pickup_checked = document.getElementsByName("p_or_d").item(0).checked;
    var ready_time_str = "";
    if (pickup_checked == false) { //then its delivery
        if (street_good == false) {
            street_location.style.backgroundColor = "#ff7777";
            ok_to_submit = false;
        } else {
            street_location.style.backgroundColor = "#ffffff";
        }
        if (city_good == false) {
            city_location.style.backgroundColor = "#ff7777";
            ok_to_submit = false;
        } else {
            city_location.style.backgroundColor = "#ffffff";
        }
        ready_time_str = collect_time(30);
    } else { //its pickup!
        ready_time_str = collect_time(15);

    }

/* Display message to user */
    var user_message = "Fields with errors are highlighted with red, please refill them.";
    if (ok_to_submit == true) {
        user_message = "Thank you for your order!<br />Your food will be";
        if (pickup_checked == false) { //its delivery
            user_message += " delivered at " + ready_time_str + "<br />";
        } else { //pickup
            user_message += " ready for pickup at " + ready_time_str + "<br />";
        }
        user_message += "Your total cost is $" + document.getElementById("total").value + "<br />";
        document.getElementById("order_results").innerHTML = user_message;
    } else {
        alert(user_message);
    }
    return ok_to_submit;
}


/*
 * collect_time() formats the time to be displayed as a pickup/delivery time
 * no potential errors
 * no clien interaction
 */
function collect_time(additive)
{
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes() + additive;
    var post_script = "AM EST.";
    var time_return = "";
    
    if (hours > 12) {
        hours = hours - 12;
        post_script = "PM EST.";
    }
    if (minutes > 59) {
        hours += 1;
        minutes -= 60;
    }
    if (minutes < 10) {
        minutes = "0" + minutes.toString();
    }
    time_return = hours.toString() + ":" + minutes.toString() + " " + post_script;
    return time_return;
}