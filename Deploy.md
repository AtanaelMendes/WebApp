# Deploy

```
cd /opt/www/AgroProject/WebApp
sudo git pull origin master
sudo npm install
sudo quasar build --mode pwa
sudo rsync -uva --delete /opt/www/AgroProject/WebApp/dist/pwa-mat/ /opt/www/AgroProject/producao/pwa/
sudo cp /opt/www/AgroProject/WebApp/src/assets /opt/www/AgroProject/producao/pwa -R
sudo chown www-data.www-data /opt/www/AgroProject/producao/pwa/ -R
```
