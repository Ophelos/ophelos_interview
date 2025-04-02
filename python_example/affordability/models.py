from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from datetime import date
import calendar


class Statement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="statements", db_index=True)
    statement_period = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        if self.statement_period and self.statement_period > date.today():
            raise ValidationError("Statement period cannot be in the future.")

    def save(self, *args, **kwargs):
        if isinstance(self.statement_period, dict):
            try:
                year = self.statement_period.get("year")
                month = self.statement_period.get("month")
                last_day = calendar.monthrange(year, month)[1]
                self.statement_period = date(year, month, last_day)
            except (TypeError, ValueError):
                raise ValidationError("Invalid statement period format.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Statement for {self.user.username} - {self.statement_period.strftime('%Y-%m')}"


class Transaction(models.Model):
    CATEGORY_CHOICES = [
        ("income", "Income"),
        ("expenditure", "Expenditure"),
    ]


    statement = models.ForeignKey(Statement, on_delete=models.CASCADE, related_name="transactions", db_index=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.CharField(max_length=100)
    amount = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.category.capitalize()}: {self.amount} for {self.statement.user.username}"
