# Use lightweight Alpine Linux with Python 3.9
FROM python:3.9.18-alpine3.18     

# Install build tools
RUN apk add build-base                  

# Install PostgreSQL dev libraries and compilers
RUN apk add postgresql-dev gcc python3-dev musl-dev  

# Set build-time variable for Flask app
ARG FLASK_APP        
# Set build-time variable for Flask environment                   
ARG FLASK_ENV    
# Set build-time variable for database URL                       
ARG DATABASE_URL   
# Set build-time variable for database schema                     
ARG SCHEMA     
# Set build-time variable for Flask secret key                         
ARG SECRET_KEY                          

# Set working directory
WORKDIR /var/www                        

# Copy Python dependencies file
COPY requirements.txt .                 

# Install Python dependencies
RUN pip install -r requirements.txt     
# Install PostgreSQL adapter for Python
RUN pip install psycopg2                

# Copy application code to container
COPY . .                                

# Run database migrations
RUN flask db upgrade    
# Seed the database                
RUN flask seed all                      

# Start Flask app using Gunicorn
CMD gunicorn app:app                    