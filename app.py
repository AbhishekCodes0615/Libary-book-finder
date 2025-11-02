from flask import Flask, request, render_template, redirect, url_for, flash
import mysql.connector

app = Flask(__name__)
app.secret_key = "ashi_secret_key"  # required for flash messages

# ✅ Database connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="ashii2423**",    # change to your actual password
    database="library_book_finder"      # change to your actual database name
)

cursor = conn.cursor(dictionary=True)

# ✅ Route for login page
@app.route("/")
def home():
    return render_template("index.html")

# ✅ Route for home page
@app.route('/dashboard')
def dashboard():
    return render_template('home.html')

# ✅ Route for login POST
@app.route("/login", methods=["POST"])
def login():
    login_id = request.form["login_id"]
    password = request.form["password"]

    # Check credentials from MySQL
    query = "SELECT * FROM login WHERE login_id = %s AND password = %s"
    cursor.execute(query, (login_id, password))
    user = cursor.fetchone()

    if user:
        flash("✅ Login Successful!", "success")
        return redirect(url_for("dashboard"))
    else:
        flash("❌ Invalid Login ID or Password. Please try again.", "danger")
        return redirect(url_for("home"))
    
if __name__ == "__main__":
    app.run(debug=True)
