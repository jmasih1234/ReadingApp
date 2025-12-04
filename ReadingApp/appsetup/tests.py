from django.test import TestCase
from django.urls import reverse
from .models import TrialLog
import json


class TrialLogWPMTest(TestCase):
	def test_server_derives_wpm_when_missing(self):
		payload = {
			"participant_id": "TST01",
			"section_index": 0,
			"condition_id": "default",
			"started_at_ms": 1000,
			"ended_at_ms": 61000,
			"duration_ms": 60000,
			"word_count": 300,
		}
		resp = self.client.post('/api/log-trial/', data=json.dumps(payload), content_type='application/json')
		self.assertEqual(resp.status_code, 200, resp.content)
		log = TrialLog.objects.get(id=resp.json()['id'])
		self.assertAlmostEqual(log.wpm, 300.0, places=2)

	def test_client_supplies_wpm(self):
		payload = {
			"participant_id": "TST02",
			"section_index": 1,
			"condition_id": "font-inter",
			"started_at_ms": 2000,
			"ended_at_ms": 5000,
			"duration_ms": 3000,
			"word_count": 45,
			"wpm": 900.0,
		}
		resp = self.client.post('/api/log-trial/', data=json.dumps(payload), content_type='application/json')
		self.assertEqual(resp.status_code, 200, resp.content)
		log = TrialLog.objects.get(id=resp.json()['id'])
		self.assertAlmostEqual(log.wpm, 900.0, places=2)