FROM postgres:latest

ENV POSTGRES_PASSWORD secret
ENV POSTGRES_USER companion

CMD sed -i "s/^bind-address/#bind-address/" /etc/postgres/my.cnf
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 5432
CMD ["postgres"]