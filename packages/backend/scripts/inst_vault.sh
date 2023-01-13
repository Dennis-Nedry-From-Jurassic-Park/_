cd
wget https://releases.hashicorp.com/vault/1.12.2/vault_1.12.2_linux_amd64.zip
unzip vault_*.zip
rm vault_*.zip
sudo chmod +x ./vault
sudo mv vault /usr/local/bin/vault

echo "export VAULT_ADDR=http://127.0.0.1:8200" >> /home/ubuntu/.profile
echo "export VAULT_ADDR=http://127.0.0.1:8200" >> /root/.profile