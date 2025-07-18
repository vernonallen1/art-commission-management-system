# Generated by Django 4.2.8 on 2025-06-16 12:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_remove_commission_progress'),
    ]

    operations = [
        migrations.CreateModel(
            name='Progress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='progress/')),
                ('description', models.CharField(max_length=100)),
                ('commission', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='progress', to='api.commission')),
            ],
        ),
    ]
