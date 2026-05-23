package in.ap.ai.activity;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.ap.entity.ClassVideo;
import in.ap.repo.ClassVideoRepo;

@Service
public class VideoTrackingService {

    @Autowired
    private VideoTrackingRepository repo;

    @Autowired
    private ClassVideoRepo classVideoRepo;

    public String track(Long userId, Long videoId, Long currentTime, String action, Long durationSeconds) {
        LocalDateTime now = LocalDateTime.now();

        VideoTracking tracking = repo
                .findByUserIdAndVideoId(userId, videoId)
                .orElse(new VideoTracking());

        persistDurationIfNeeded(videoId, durationSeconds);

        tracking.setUserId(userId);
        tracking.setVideoId(videoId);
        tracking.setCurrentTime(currentTime);
        tracking.setLastUpdated(now);

        // Mark first contact with a video so dashboards can count it as started.
        if ("start".equals(action)) {
            if (tracking.getFirstActionTime() == null) {
                tracking.setFirstActionTime(now);
            }
            repo.save(tracking);
            return "OK";
        }

        if ("progress".equals(action)) {
            if (tracking.getFirstActionTime() == null) {
                tracking.setFirstActionTime(now);
            }
            repo.save(tracking);
            return "OK";
        }

        if ("end".equals(action) || "exit".equals(action)) {
            repo.save(tracking);
            return "OK";
        }

        if ("reset".equals(action)) {
            tracking.setPauseCount(0);
            tracking.setRewindCount(0);
            tracking.setFirstActionTime(now);
            repo.save(tracking);
            return "OK";
        }

        refreshWindowIfNeeded(tracking, now);

        if ("pause".equals(action)) {
            tracking.setPauseCount(tracking.getPauseCount() + 1);
        }

        if ("rewind".equals(action)) {
            tracking.setRewindCount(tracking.getRewindCount() + 1);
        }

        boolean stuck = isUserStuck(tracking, now);

        repo.save(tracking);

        if (stuck) {
            return "STUCK_DETECTED";
        }

        return "OK";
    }

    private void persistDurationIfNeeded(Long videoId, Long durationSeconds) {
        if (videoId == null || durationSeconds == null || durationSeconds <= 0) {
            return;
        }

        ClassVideo classVideo = classVideoRepo.findById(videoId).orElse(null);
        if (classVideo == null) {
            return;
        }

        if (classVideo.getDurationSeconds() == null || classVideo.getDurationSeconds() < durationSeconds) {
            classVideo.setDurationSeconds(durationSeconds);
            classVideoRepo.save(classVideo);
        }
    }

    private boolean isUserStuck(VideoTracking tracking, LocalDateTime now) {
        return (tracking.getPauseCount() >= 4 && tracking.getRewindCount() >= 2)
                || (tracking.getRewindCount() >= 5);
    }

    private void refreshWindowIfNeeded(VideoTracking tracking, LocalDateTime now) {
        if (tracking.getFirstActionTime() == null || tracking.getFirstActionTime().plusMinutes(10).isBefore(now)) {
            tracking.setPauseCount(0);
            tracking.setRewindCount(0);
            tracking.setFirstActionTime(now);
        }
    }
}
