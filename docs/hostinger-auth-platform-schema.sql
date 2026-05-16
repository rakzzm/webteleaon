-- Teleaon baseline auth and platform access schema for Hostinger MySQL.
-- Run this in phpMyAdmin after creating a dedicated database for the website.

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NULL,
  image_url TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY users_email_unique (email)
);

CREATE TABLE IF NOT EXISTS auth_accounts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  provider VARCHAR(64) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY auth_accounts_provider_unique (provider, provider_account_id),
  KEY auth_accounts_user_id_index (user_id),
  CONSTRAINT auth_accounts_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  session_token VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY user_sessions_token_unique (session_token),
  KEY user_sessions_user_id_index (user_id),
  CONSTRAINT user_sessions_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS platforms (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(80) NOT NULL,
  name VARCHAR(160) NOT NULL,
  app_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY platforms_slug_unique (slug)
);

CREATE TABLE IF NOT EXISTS user_platform_access (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  platform_id BIGINT UNSIGNED NOT NULL,
  role VARCHAR(80) NOT NULL DEFAULT 'member',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY user_platform_access_unique (user_id, platform_id),
  KEY user_platform_access_platform_index (platform_id),
  CONSTRAINT user_platform_access_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT user_platform_access_platform_id_fk FOREIGN KEY (platform_id) REFERENCES platforms (id) ON DELETE CASCADE
);

INSERT INTO platforms (slug, name, app_url)
VALUES
  ('contact-center', 'Contact Center Platform', 'https://contact-center.your-domain.com'),
  ('healthcare', 'Healthcare Platform', 'https://healthcare.your-domain.com'),
  ('gen-ai', 'Gen AI Platform', 'https://gen-ai.your-domain.com'),
  ('agentic-voice', 'Agentic Voice Platform', 'https://voice.your-domain.com'),
  ('agentic-chat', 'Agentic Chat Platform', 'https://chat.your-domain.com'),
  ('campaign-manager', 'Agentic Campaign Manager Platform', 'https://campaigns.your-domain.com')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  app_url = VALUES(app_url),
  is_active = TRUE;
