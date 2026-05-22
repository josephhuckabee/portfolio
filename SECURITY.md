# Security Policy

## Scope

This policy applies to `builtbyjoseph.com` and the code in this portfolio repository.

## Contact Form

The contact endpoint receives form submissions and sends them through an email provider. It should not store secrets in source code.

Required secrets must be configured as environment variables:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

Do not commit API keys, tokens, private email credentials, or deployment secrets.

## Reporting a Security Issue

If you discover a security issue, please do not publicly disclose it before Joseph has had a chance to review it.

Use the contact page and include:

- A short description of the issue
- Steps to reproduce it
- The affected URL or file
- Any relevant screenshots or request details

## Hardening Notes

- Keep the contact endpoint limited to `POST`.
- Keep dependency use minimal.
- Avoid adding client-side scripts from unknown sources.
- Treat all form input as untrusted.
- Keep deployment secrets in the hosting provider's environment settings.
