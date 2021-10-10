# Generated by Django 3.1.3 on 2021-10-10 14:06

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('user_name', models.CharField(max_length=120)),
                ('github_name', models.CharField(max_length=120)),
            ],
        ),
    ]
