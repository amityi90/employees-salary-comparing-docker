FROM python
EXPOSE 5000

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1
ADD requirements.txt .
RUN python -m pip install -r requirements.txt
WORKDIR /app
ADD . /app
CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0"]
