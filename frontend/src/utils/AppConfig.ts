class AppConfig {
  public vacationUrl = "http://localhost:8080/api/vacations";
  public addVacationUrl = "http://localhost:8080/api/vacations";
  public editVacationUrl = "http://localhost:8080/api/vacations";
  public followUrl = "http://localhost:8080/api/followers";
  public signupUrl = 'http://localhost:8080/api/auth/register';

  public imagesUrl='http://localhost:8080/images';

  public loginUrl = 'http://localhost:8080/api/auth/login';

  public successNotificationDuration = 2000;
  public errorNotificationDuration = 6000;
}

const appConfig = new AppConfig();
export default appConfig;
