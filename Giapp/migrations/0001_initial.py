# Generated by Django 4.1.3 on 2023-05-25 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note_title', models.CharField(max_length=150)),
                ('note_desc', models.CharField(max_length=250)),
            ],
        ),
    ]
