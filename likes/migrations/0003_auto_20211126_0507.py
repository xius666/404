# Generated by Django 3.1.3 on 2021-11-26 05:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('likes', '0002_like_inbox'),
    ]

    operations = [
        migrations.AlterField(
            model_name='like',
            name='type',
            field=models.CharField(default='Like', max_length=100),
        ),
    ]
