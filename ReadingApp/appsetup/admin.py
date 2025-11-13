from django.contrib import admin
from .models import TrialLog


@admin.register(TrialLog)
class TrialLogAdmin(admin.ModelAdmin):
	list_display = ("id", "participant_id", "section_index", "condition_id", "word_count", "wpm", "duration_ms", "created_at")
	list_filter = ("condition_id", "participant_id")
	search_fields = ("participant_id", "condition_id")

# Register your models here.
