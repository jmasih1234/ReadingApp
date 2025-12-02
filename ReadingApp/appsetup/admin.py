from django.contrib import admin
from .models import TrialLog, PreferenceSurvey


@admin.register(TrialLog)
class TrialLogAdmin(admin.ModelAdmin):
	list_display = ("id", "participant_id", "condition_id", "word_count", "wpm", "duration_ms")
	list_filter = ("condition_id", "participant_id")
	search_fields = ("participant_id", "condition_id")


@admin.register(PreferenceSurvey)
class PreferenceSurveyAdmin(admin.ModelAdmin):
	list_display = ("id", "participant_id", "created_at")
	search_fields = ("participant_id",)
	readonly_fields = ("ranked_conditions", "created_at")
