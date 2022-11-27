### auth
mkdir otp
cd otp
git clone https://github.com/Open-Tests-Project/auth-ui.git
cd auth-ui/
yarn
cp .env.example .env [edit .env file]
(sudo) npm run build
#### edit nginx configuration
``` nginx
#sudo vim /etc/nginx/conf.d/default.conf
location /otp {
    alias /var/www/html/;
}
#restart nginx
sudo /usr/sbin/nginx -t
sudo service nginx reload
```

cd ..

### api
cd ..
cd api
yarn
cp .env.example .env [edit .env file]
#### edit nginx configuration
``` nginx
#sudo vim /etc/nginx/conf.d/default.conf
location /myapi {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    rewrite ^/myapi/?(.*) /$1 break;
    proxy_pass http://127.0.0.1:4001/;
    proxy_redirect off;
}
#restart nginx
sudo /usr/sbin/nginx -t
sudo service nginx reload
```

### dashboard
git clone https://github.com/Open-Tests-Project/dashboard.git
cd dashboard
yarn
cp .env.example .env [edit .env file]
#### edit nginx configuration
``` nginx
#sudo vim /etc/nginx/conf.d/default.conf
location /dashboard/ {
        rewrite ^/dashboard/(.*)$ /$1 break;
        proxy_pass http://127.0.0.1:3006;
}
#restart nginx
sudo /usr/sbin/nginx -t
sudo service nginx reload
```

#### start the service
```
npm run start
```

### iat
cd ..
git clone https://github.com/Open-Tests-Project/iat.git

