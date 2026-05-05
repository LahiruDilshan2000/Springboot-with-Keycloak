# Build stage
FROM maven:3.9.6-eclipse-temurin-17 as build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
Copy src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM amazoncorretto:17
# define few things
ARG PROFILE=dev
ARG APP_VERSION=1.0.0


WORKDIR /app
COPY --from=build /build/target/bookshop-*.jar /app/bookshop.jar

EXPOSE 8080

ENV DB_URL=jdbc:postgresql://postgres:5432/book-shop
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}
ENV EMAIL_HOSTNAME=missing_host_name
ENV EMAIL_USER_NAME=missing_user_name
ENV EMAIL_PASSWORD=missing_password

CMD ["java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} /app/bookshop.jar"]
