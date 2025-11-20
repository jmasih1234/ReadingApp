from django.db import models


class TrialLog(models.Model):
	"""Stores a single reading trial event for a participant.

	A trial corresponds to reading one section under a given condition.
	"""
	participant_id = models.CharField(max_length=64, db_index=True)
	section_index = models.PositiveIntegerField()  # 0-based index of section shown
	condition_id = models.CharField(max_length=64)  # e.g. 'font-inter', 'size-large'

	# Optional timing details (from client)
	started_at_ms = models.BigIntegerField(null=True, blank=True)
	ended_at_ms = models.BigIntegerField(null=True, blank=True)
	duration_ms = models.PositiveIntegerField(null=True, blank=True)

	# Reading performance metrics
	word_count = models.PositiveIntegerField(null=True, blank=True)
	wpm = models.FloatField(null=True, blank=True, help_text="Words per minute for this trial (derived from word_count and duration_ms)")

	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		indexes = [
			models.Index(fields=["participant_id", "section_index"]),
		]

	def __str__(self) -> str:
		return f"Trial(participant={self.participant_id}, section={self.section_index}, condition={self.condition_id})"


class PreferenceSurvey(models.Model):
	"""Stores a participant's ranked preferences for the 8 conditions after completing trials."""
	participant_id = models.CharField(max_length=64, db_index=True, unique=True)
	ranked_conditions = models.JSONField(help_text="Ordered list of condition IDs from most to least preferred")
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self) -> str:
		return f"Survey(participant={self.participant_id})"
