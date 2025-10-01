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
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
		     .authorizeHttpRequests(auth->{
		    	      auth.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
		    	          .requestMatchers("/api/**").authenticated()
		    	          .requestMatchers("/lecturer/**").hasRole("LECTURER")
		    	          .requestMatchers("/auth/**").permitAll()
		    	          .requestMatchers("/admin/**").hasRole("ADMIN")
		    	          .anyRequest().permitAll();
		     })
		     .addFilterBefore(new JwtValidator(), BasicAuthenticationFilter.class)
		     .csrf().disable();
		    
		    
		     return http.build();
		   
	}
	
	@Bean
	public PasswordEncoder encoder()
	{
		return new BCryptPasswordEncoder();
	}
	
	
}