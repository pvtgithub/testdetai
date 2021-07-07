
import pymysql
from flask import Flask,jsonify,request, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.sql import and_,or_
from flask_cors import CORS
from flask_mysqldb import MySQL
import Model


app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root@localhost:3306/flaskapp?charset=utf8mb4"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app) # Khoi tao sqlalcemy


@app.route('/', methods=['GET'])
def index():
   return "hello!"

@app.route("/home", methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/abc',methods=['GET','POST'])
def abc():
   a = {
       "CustomerID":1,
       "name":"lvminh"
   }
   return jsonify(a)

@app.route('/login',methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    print(username,password)
    if username == 'admin' and password == '123':
        return 'success'
    else:
        return 'Fail'

@app.route('/allCustomer',methods=['GET','POST'])
def allCustomer():
    rs = db.session.query(Model.Customers).all()
    rt = []
    for item in rs:
        rt.append(item.toString)
    return jsonify(rt)

@app.route('/addCustomer',methods=['POST'])
def addCustomer():
    CustomerName = request.form['CustomerName']
    CustomerAge = request.form['CustomerAge']
    PhoneNumber = request.form['PhoneNumber']
    Address = request.form['Address']
    EmailAdress = request.form['EmailAdress']
    cus = Model.Customers(CustomerName = CustomerName,CustomerAge = CustomerAge,PhoneNumber = PhoneNumber,Address = Address,EmailAdress = EmailAdress)
    db.session.add(cus)
    db.session.commit()
    return "success"

@app.route("/getCustomer/<id>",methods=['GET'])
def getCustomer(id):
    rs = db.session.query(Model.Customers).filter(Model.Customers.CustomerID==id).all()
    response = []
    for item in rs:
       response.append(item.toString)
    return jsonify(response)

@app.route("/getOrderof/<id>",methods=['GET'])
def getOrderof(id):
    rs = db.session.query(Model.Customers).filter(Model.Customers.CustomerID==id).one()
    orders = rs.orders
    return jsonify(orders[0].toString)

@app.route("/deleteCustomer/<id>",methods=['DELETE'])
def deleteCustomer(id):
    customer = db.session.query(Model.Customers).filter(Model.Customers.CustomerID==id).first()
    db.session.delete(customer)
    db.session.commit()
    return  "ok",200

@app.route("/updateCustomer/<id>",methods=['POST'])
def update(id):
    CustomerName = request.form['CustomerName']
    CustomerAge = request.form['CustomerAge']
    PhoneNumber = request.form['PhoneNumber']
    Address = request.form['Address']
    EmailAdress = request.form['EmailAdress']
    if CustomerName=='' and CustomerAge == '' and PhoneNumber == ''and Address=='' and EmailAdress == '' :
        return 'not ok'
    else:
        # sửa Model.Users.UserID thành giống bên file Model
        rs = db.session.query(Model.Customers).filter(Model.Customers.CustomerID==id).first()
        if CustomerName != '':
            rs.CustomerName = CustomerName
        if CustomerAge != '':
            rs.CustomerAge = CustomerAge
        if PhoneNumber != '':
            rs.PhoneNumber = PhoneNumber
        if Address != '':
            rs.Address = Address
        if EmailAdress != '':
            rs.EmailAdress = EmailAdress
        db.session.commit()
        return  "ok",200

if __name__ == '__main__':
    db.create_all()
    app.run(port=5555,host="0.0.0.0",debug=True)
