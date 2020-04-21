
### Это "болванка" Web API, написанного на .NET Core 3.1
Приложение имеет стандартную трёхуровневую архитектуру. 
Вся бизнес-логика сконцентрирована в сервисах.
Контроллеры только проксируют запросы в сервисы и обратно. 
Сервисы в свою очередь могут общаться с репозиториями и манипулировать данными.

**Autofac 5.1** использован в роли DI-библиотеки

**Automapper 9.0** использован как маппер

**EntityFrameforkCore 2.1** использован как ORM (посредник между приложением и БД). Механизм миграций настроен и работает через **dotnet-ef tool**

Весь код написан и запускается в среде разработки JetBrains **Rider**

Запись стрима с лайвкодингом этой болванки: https://youtu.be/w6SOHs-0CJY


...........................


### This is an example Web API based on .NET Core 2.1
App has simple three-layers architecture. 
All business logic concentrate on services.

**Autofac 5.1** used as DI library

**Automapper 9.0** used as mapping library

**EntityFrameforkCore 2.1** used as ORM. Migration mechanism setup and works through **dotnet-ef tool**

All code made by JetBrains **Rider** IDE
