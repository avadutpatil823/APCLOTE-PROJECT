package in.ap.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
public class AppConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           OAuth2SuccessHandler successHandler,
                                           RestAuthenticationEntryPoint restEntryPoint,
                                           JwtValidator jwtValidator) throws Exception {

        http
            .cors()
            .and()
            .csrf(csrf -> csrf.disable())
            .formLogin(form -> form.disable()) // disable HTML form login
            .httpBasic(basic -> basic.disable())  // disable Basic Auth popups
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(ex -> ex.authenticationEntryPoint(restEntryPoint)) // 👈 force JSON
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/auth/**", "/oauth2/**","/api/**").permitAll()
                .requestMatchers("/lecturer/**").hasRole("LECTURER")
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            // keep OAuth2 login for browser-based login
            .oauth2Login(oauth -> oauth
                .successHandler(successHandler)
                .failureUrl("/auth/oauth2/failure")
            )
            // make sure JwtValidator runs before authentication happens
            .addFilterBefore(jwtValidator, BasicAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
