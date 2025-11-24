from django.db import models

class TrialLog(models.Model):

	participant_id = models.CharField(max_length=64, db_index=True)
	section_index = models.PositiveIntegerField()
	condition_id = models.CharField(max_length=64)

	started_at_ms = models.BigIntegerField(null=True, blank=True)
	ended_at_ms = models.BigIntegerField(null=True, blank=True)
	duration_ms = models.PositiveIntegerField(null=True, blank=True)

	word_count = models.PositiveIntegerField(null=True, blank=True)
	wpm = models.FloatField(null=True, blank=True)

	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		indexes = [
			models.Index(fields=["participant_id", "section_index"]),
		]

	def __str__(self):
		return f"Trial(participant={self.participant_id}, section={self.section_index}, condition={self.condition_id})"


class PreferenceSurvey(models.Model):
	participant_id = models.CharField(max_length=64, db_index=True, unique=True)
	ranked_conditions = models.JSONField()
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"Survey(participant={self.participant_id})"