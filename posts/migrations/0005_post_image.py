# Generated by Django 3.1.3 on 2021-10-29 02:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_remove_post_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.TextField(blank=True),
        ),
    ]