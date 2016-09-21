from django.db import models
from djangotoolbox.fields import ListField


# Create your models here.
class Symbol(models.Model):
    ticker = models.CharField(max_length=10)
    name = models.CharField(max_length=100)


class Portfolio(models.Model):
    companies = ListField()