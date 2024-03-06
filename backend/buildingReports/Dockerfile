FROM maven:3.8.4-openjdk-17 as build
COPY . /usr/app
WORKDIR /usr/app
RUN mvn -f ./pom.xml clean package

FROM eclipse-temurin:17-jre-alpine
COPY --from=build /usr/app/target/*.jar app.jar
EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "app.jar" ]