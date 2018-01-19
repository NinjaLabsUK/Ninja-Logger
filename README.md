# Ninja Logger
 
Ninja Logger is a NodeJS app for viewing logs sent from a PHP application instead of having to use echo and var_dump throughout your PHP code.
 
## Prerequisites
- Existing PHP application with Monolog installed
- NodeJS
- Ninja Logger (clone it above)
 
## PHP Setup
```php
$logger = new \Monolog\Logger('name');
$socketHandler = new\Monolog\Handler\SocketHandler("udp://127.0.0.1:8001");
$jsonFormatter = new Monolog\Formatter\JsonFormatter();
$socketHandler->setPersistent(true);
$socketHandler->setFormatter($jsonFormatter);
$logger->pushHandler($socketHandler);
```
 
The code above creates a new logger instance that uses a socket handler to send JSON formatted logs to the Ninja Logger app.
 
## Run it!
```sh
node .
```
 
### Todos
 
 - Download logs (in different formats)
 - Search feature