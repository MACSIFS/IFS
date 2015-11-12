from server.tests.base import BaseTestCase


class ClientIdTest(BaseTestCase):
    def _find_client_id_cookie(self):
        client_id = None
        for cookie in self.client.cookie_jar:
            if cookie.name == 'client_id':
                client_id = cookie.value
        return client_id

    def test_generate_id(self):
        self.client.get('/')
        client_id = self._find_client_id_cookie()

        assert client_id is not None

    def test_reuse_id(self):
        self.client.get('/')
        client_id_1 = self._find_client_id_cookie()

        self.client.get('/')
        client_id_2 = self._find_client_id_cookie()

        assert client_id_1 == client_id_2

    def test_clear_cookie(self):
        self.client.get('/')
        client_id_1 = self._find_client_id_cookie()

        self.client.cookie_jar.clear()
        self.client.get('/')
        client_id_2 = self._find_client_id_cookie()

        assert client_id_1 != client_id_2

