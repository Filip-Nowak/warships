package org.example.warships.service;

import lombok.RequiredArgsConstructor;
import org.example.warships.exception.UserNotFound;
import org.example.warships.cache.ProfileEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final CacheService cacheService;
    public ProfileEntity createUser(String nickname) {
        return cacheService.createUser(nickname);
    }
    public ProfileEntity getUser(String id) throws UserNotFound{
        return cacheService.getUser(id);
    }
    public void updateUser(ProfileEntity user){
        cacheService.updateUser(user);
    }
}
