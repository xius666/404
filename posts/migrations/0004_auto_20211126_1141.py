# Generated by Django 3.1.3 on 2021-11-26 11:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0003_auto_20211122_1010'),
        ('posts', '0003_auto_20211126_0507'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='commentsSrc',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='comments.comments'),
        ),
    ]
