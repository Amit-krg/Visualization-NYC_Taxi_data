from flask import Flask
from flask import request
from flask import render_template

app = Flask(__name__)

@app.route("/")
def index():
	print("request received")
	return render_template("index.html")

@app.route('/parallel')
@app.route('/parallel/<name>')
def parallel(Name=None):
	return render_template("parallel.html")	

@app.route('/advance')
@app.route('/advance/<name>')
def advance(Name=None):
	return render_template("advance.html")

@app.route('/charts')
@app.route('/charts/<name>')
def chart(Name=None):
	return render_template("chart.html")

@app.route('/tip')
@app.route('/tip/<name>')
def tip(Name=None):
	return render_template("tip.html")

@app.route('/payment')
@app.route('/payment/<name>')
def payment(Name=None):
	return render_template("payment_type.html")

@app.route('/passenger')
@app.route('/passenger/<name>')
def passenger(Name=None):
	return render_template("passenger_count.html")

if __name__ == "__main__":
	app.run(host='127.0.0.1',port=3000,debug=True)