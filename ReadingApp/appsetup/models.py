from django.db import models

class TrialLog(models.Model):
	"""Stores a single reading trial event for a participant.

	A trial corresponds to reading one section under a given condition.
	"""
	participant_id = models.CharField(max_length=64, db_index=True)
	condition_id = models.CharField(max_length=64)  # e.g. 'font-inter', 'size-large'

	# Reading performance metrics
	word_count = models.PositiveIntegerField(null=True, blank=True)
	wpm = models.FloatField(null=True, blank=True, help_text="Words per minute for this trial (derived from word_count and duration_ms)")
	duration_ms = models.PositiveIntegerField(null=True, blank=True)

	class Meta:
		indexes = [
			models.Index(fields=["participant_id"]),
		]

	def __str__(self):
		return f"Trial(participant={self.participant_id}, condition={self.condition_id})"


class PreferenceSurvey(models.Model):
	participant_id = models.CharField(max_length=64, db_index=True, unique=True)
	ranked_conditions = models.JSONField()
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"Survey(participant={self.participant_id})"