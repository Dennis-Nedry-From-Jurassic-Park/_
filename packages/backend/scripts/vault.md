docker run --rm --detach --name vault -p 8200:8200 vault:1.12.2 -e 'VAULT_DEV_ROOT_TOKEN_ID=hvs.vPPOuty952Ml1KaXJBG7NkEq' -e 'SKIP_SETCAP=1' vault

docker exec -it 522cfbdea89a8e337b2a1fd9a36483770f6fe65b4856b068ce06c15478a77d9f /bin/sh

docker run --rm --cap-add IPC_LOCK --name vault -p 8200:8200 vault:1.12.2 -e 'VAULT_DEV_ROOT_TOKEN_ID=hvs.vPPOuty952Ml1KaXJBG7NkEq' -e 'SKIP_SETCAP=1' vault 

server:
docker run --rm --cap-add IPC_LOCK --name vault -p 8200:8200 vault:1.12.2 -e 'VAULT_DEV_ROOT_TOKEN_ID=hvs.vPPOuty952Ml1KaXJBG7NkEq' -e 'SKIP_SETCAP=1' vault server 

https://adityagoel123.medium.com/setting-up-vault-inside-docker-6fba3363eb2


go get github.com/martinbaillie/vault-plugin-secrets-github

lsb_release -a



wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install vault

https://github.com/creditkarma/vault-client

https://gist.github.com/pablotrinidad/550b6495c9debc839fed63cb30e12f52
cd
wget https://releases.hashicorp.com/vault/1.12.2/vault_1.12.2_linux_amd64.zip
unzip vault_*.zip
rm vault_*.zip
sudo chmod +x ./vault
sudo mv vault /usr/local/bin/vault

echo "export VAULT_ADDR=http://127.0.0.1:8200" >> /home/ubuntu/.profile
echo "export VAULT_ADDR=http://127.0.0.1:8200" >> /root/.profile~~~~