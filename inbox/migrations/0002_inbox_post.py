# Generated by Django 3.1.3 on 2021-11-19 01:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('posts', '0001_initial'),
        ('inbox', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='inbox',
            name='post',
            field=models.ManyToManyField(blank=True, to='posts.Post'),
        ),
    ]
