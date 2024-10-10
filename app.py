from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configurar la conexión con MySQL
db = mysql.connector.connect(
    host="localhost",       # Dirección del servidor MySQL (puede ser 'localhost' si es local)
    # port="3306",            # Puerto de conexión a MySQL
    user="root",      # Cambia esto por tu usuario de MySQL
    password="root",  # Cambia esto por tu contraseña de MySQL
    database="test" # Cambia esto por el nombre de tu base de datos
)

@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.json
    usuario = data.get('usuario')
    email = data.get('email')
    password = data.get('password')

    cursor = db.cursor()
    # Inserta los datos en la tabla correspondiente
    query = "INSERT INTO usuarios (usuario, email, password) VALUES (%s, %s, %s)"
    cursor.execute(query, (usuario, email, password))
    db.commit()

    return jsonify({"message": "Datos guardados en MySQL"}), 200


@app.route('/get-users', methods=['GET'])
def get_users():
  cursor = db.cursor()
  # Obtiene todos los usuarios de la tabla 'usuarios'
  query = "SELECT * FROM usuarios"
  cursor.execute(query)
  users = cursor.fetchall()

  # Convertir los resultados en una lista de diccionarios
  users_list = []
  for user in users:
    user_dict = {
      "id": user[0],
      "usuario": user[1],
      "email": user[2],
      "password": user[3]
    }
    users_list.append(user_dict)

  return jsonify({"users": users_list}), 200

if __name__ == '__main__':
    app.run(debug=True)