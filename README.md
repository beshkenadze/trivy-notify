# trivy-notify

# Usage

```shell script
   message=$(docker run --rm aquasec/trivy client \
   --remote http://${SERVER} \
   --token ${SERVER_TOKEN} ${TEST_IMAGE} | sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/\\\\n/g') \
   && deno run --allow-net mod.ts \
   --subject="${MESSAGE_SUBJECT}" --message="${message}" --from="${MESSAGE_FROM}" --recipient="${MESSAGE_TO}" \
   --hostname="${SMTP_HOSTNAME}" --port="${SMTP_PORT}" --tls="${SMTP_TLS}" \
   --username="${SMTP_USER}" --password="${SMTP_PASSWORD}"
```