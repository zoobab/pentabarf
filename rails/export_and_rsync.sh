#!/bin/sh

F="FOSDEM12"

/bin/rm -rf "/pentabarf/rails/tmp/fosdem-export/$F/" && \
cd /pentabarf/rails && \
./script/fosdem-export "$F" && \
rsync -azd --ignore-times -e 'ssh -i /home/pentabarf/.ssh/apeiron_id_rsa -l pentabarf' "/pentabarf/rails/tmp/fosdem-export/$F/" apeiron.fosdem.org:"/home/services/pentabarf/tmp/html-export/$F/"
