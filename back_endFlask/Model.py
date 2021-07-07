from sqlalchemy import Column, Integer, DATETIME, String, ForeignKey
from sqlalchemy.orm import relationship
from main import db
import datetime

class Customers(db.Model):
    __tablename__ = "Customers"
    CustomerID = Column(Integer, primary_key=True, autoincrement=True)
    CustomerName = Column(String(255))
    CustomerAge = Column(String(255))
    PhoneNumber = Column(String(255))
    Address = Column(String(255))
    EmailAdress = Column(String(255))
    orders = relationship('Orders', backref='Customers', lazy=True)
    def __init__(self, CustomerName='', CustomerAge='', PhoneNumber='',Address='', EmailAdress=''):
        self.CustomerName = CustomerName
        self.CustomerAge = CustomerAge
        self.PhoneNumber = PhoneNumber
        self.Address = Address
        self.EmailAdress = EmailAdress

    @property
    def toString(self):
        return {
            'CustomerID':self.CustomerID,
            'CustomerName':self.CustomerName,
            'CustomerAge':self.CustomerAge,
            'PhoneNumber':self.PhoneNumber,
            'Address':self.Address,
            'EmailAdress':self.EmailAdress,
        }

class Orders(db.Model):
    __tablename__="Orders"
    OrderID = Column(Integer,primary_key=True,autoincrement=True)
    CustomerID = Column(Integer, ForeignKey(Customers.CustomerID), nullable=False)
    EmployeeID = Column(Integer)
    OrderDate = Column(DATETIME, default=datetime.datetime.now())
    ShipperID = Column(Integer)
    def __init__(self,CustomerId,employeeId,shiperId):
        self.CustomerID = CustomerId
        self.EmployeeID = employeeId
        self.ShipperID = shiperId
    @property
    def toString(self):
        return {
            'OrderID':self.OrderID,
            'CustomerID':self.CustomerID,
            'EmployeeID':self.EmployeeID,
            'OrderDate':self.OrderDate,
            'ShipperID':self.ShipperID
        }

if __name__ == '__main__':
    db.create_all()