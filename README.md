# Hotel Recommendation System with Implicit Feedback
This repository houses the source code and documentation for a hotel recommendation system that leverages implicit feedback data like hotel bookings and user searches. It empowers users to discover hotels that align with their preferences, enhancing their travel experiences.

### Authored by
Sofía Suárez Fernández - UO270149@uniovi.es

## Quick links
- [Project Report](https://unioviedo-my.sharepoint.com/:w:/g/personal/uo270149_uniovi_es/EbhmXMeKL3tCu14wEQM64goBzFFTHNbiCQWXv54bJuE2Fg?e=xz96KP)
- [Project Defense]()

## Getting started (Prerequisites)
1. **Vitrual environment:** Make sure you have a virtual environment activated for this project. You can activate it using a command like ```source .venv/bin/activate``` (assuming your virtual environment is named ```.venv```).
2. **Visual Studio Code (Recommended):** Download and install it from https://code.visualstudio.com/. Open the code downloaded in VSCode.
3. **Python ()3.8 or later:** Install the appropiate version of Python for your OS from https://www.python.org/downloads/.
4. **Poetry:** A tool for dependency management in Python projects. Install Poetry by running ```pip install poetry``` in a terminal. Add the Poetry path to your shell. In the project, navigate to the ```backend``` folder and run ```poetry install``` to install the project dependencies.
5. **PostgreSQL:** A relational database management system used by the project. Install it for your operating system. During the installation, choose a password for the "postgres" user, which is the PostgreSQL superuser. Remember this password as you will need it later to configure the database.
6. **pgAdmin4 (Optional):** A graphical database management tool that can be used to manage PostgreSQL databases. Download and install pgAdmin4 from https://www.pgadmin.org/download/.

## Project Setup
**_Backend_:**
1. **Ensure PostgreSQL is _running_:** Verify that you PostgreSQL database is running and accessible.
2. **Navigate to the _backend_ folder:** Use ```cd backend``` to navigate to the backend directory.
3. **Run the development server:** Execute ```python manage.py runserver``` to start the development server for the backend application.
4. **Create a superuser (optional):** If you haven't already, create a superuser account for administrative tasks using ```python manage.py createsuperuser```.

**_Frontend_:**
1. **Navigate to the _frontend_ folder:** Use ```cd frontend``` to navigate to the frontend directory.
2. **Install dependencies (if needed):** If the project dependencies haven't been installed yet, run ```npm run install```. This will download and install all the necessary packages for the frontend application.
3. **Start the frontend development server:** Execute ```npm run start``` to launch the development server for the frontend application.

**Tips**:
- Access the application at ```http://localhost:3000``` (this port may vary based on your configuration).
- Consult the project documentation for more detailed setup and configuration instructions.

**By adhering to these prerequisites and steps, you'll be well on your way to running this hotel recommendation system effectively.**
