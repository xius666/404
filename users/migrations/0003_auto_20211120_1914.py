# Generated by Django 3.1.3 on 2021-11-20 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20211120_1912'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(editable=False, max_length=180, primary_key=True, serialize=False, unique=True),
        ),
    ]
