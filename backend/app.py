from flask import Flask, jsonify
from flask import request
import pymongo
import dns
app = Flask(__name__)
client = pymongo.MongoClient('mongodb+srv://amityi90:1234@cluster0.vk8sc5j.mongodb.net/?retryWrites=true&w=majority')
# client = pymongo.MongoClient(
#     host='cluster0',
#     username="amityi90",
#     password="1234",
# )
app.config['DB'] = client.get_database('employees')
db = app.config['DB']
# # Specify the collection to be used
col_employees = db.salarymanagement


@app.route("/get_all_employees", methods=['GET'])
def get_all_employees():

    try:
        employees_list = []
        cursor = col_employees.find({})  # find all employees
        for employee in cursor:
            employees_list.append({
                'Name': employee['Name'],
                'Email': employee['Email'],
                'Address': employee['Address'],
                'Phone': employee['Phone'],
                'MaritalStatus': employee['MaritalStatus'],
                'Gender': employee['Gender'],
                'Salary': employee['Salary']
            })

        return jsonify(list_employees=employees_list), 200
    except:
        return jsonify(message="Error in get_all_employees"), 500


@app.route("/get_employee", methods=['POST'])
def get_employee():

    try:
        request_json = request.get_json()
        email = request_json["Email"]
        cursor = col_employees.find({'Email': email})[0]
        employee = {}
        for key in cursor:
            if key != '_id':
                employee[key] = cursor[key]
        return jsonify(employee=employee), 200
    except:
        return jsonify(message="Error in get_employee"), 500


@app.route("/update_employee", methods=['POST'])
def update_employee():

    try:
        request_json = request.get_json()
        name = request_json["Name"]
        col_employees.find_one_and_update(
            {'Name': name}, {'$set': request_json})
        return jsonify(message="Employee Updated"), 200
    except:
        return jsonify(message="Error in update_employee"), 500


@app.route("/upload_employee", methods=['POST'])
def upload_employee():

    if request.method == 'POST':
        request_json = request.get_json()
        name = request_json["Name"]
        email = request_json["Email"]
        address = request_json["Address"]
        phone = request_json["Phone"]
        maritalStatus = request_json['MaritalStatus']
        gender = request_json['Gender']
        salery = request_json['Salery']
        try:
            employee_email_mongo = col_employees.find_one({"Email": email})
            if employee_email_mongo == None:  # if employee does not exist in DB
                col_employees.insert_one({'Name': name, 'Email':
                                          email, 'Address': address, 'Phone': phone, 'MaritalStatus': maritalStatus, 'Gender': gender, 'Salery': salery})
                return jsonify(message="Employee Uploaded"), 200
            else:
                return jsonify(message="Employee Already Exists"), 404
        except:
            return jsonify(message="Error in uploading Employee"), 500


if __name__ == '__main__':
    app.run(debug=True)
