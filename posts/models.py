from django.db import models
import uuid

# Create your models here.

class Post(models.Model):
    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    title = models.CharField(max_length=120)
    content = models.TextField()

