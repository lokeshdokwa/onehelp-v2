import React, { useRef, useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useSOSStore } from '../../store/useSOSStore';
import { SOSService } from '../../services/SOSService';
import { TypographyText } from '../ui/Typography';
import { Colors } from '../../theme/colors';

const HOLD_DURATION = 3000;
const SIZE = 220;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const PanicButton = () => {
  const { status } = useSOSStore();
  const progress = useSharedValue(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fireSOS = () => {
    ReactNativeHapticFeedback.trigger('notificationError');
    SOSService.triggerSOS('button', 'general', false);
  };

  const handlePressIn = useCallback(() => {
    ReactNativeHapticFeedback.trigger('impactHeavy');
    progress.value = withTiming(1, {
      duration: HOLD_DURATION,
      easing: Easing.linear,
    });
    timerRef.current = setTimeout(() => {
      runOnJS(fireSOS)();
    }, HOLD_DURATION);
  }, []);

  const handlePressOut = useCallback(() => {
    cancelAnimation(progress);
    progress.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.quad) });
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Arc ring animation — strokeDashoffset goes from CIRCUMFERENCE (empty) to 0 (full)
  const ringStyle = useAnimatedStyle(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }));

  // Outer glow that expands as you hold
  const glowStyle = useAnimatedStyle(() => ({
    opacity: progress.value * 0.6,
    transform: [{ scale: 1 + progress.value * 0.3 }],
  }));

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.container}
    >
      {/* Outer glow ring */}
      <Animated.View style={[styles.glow, glowStyle]} />

      {/* SVG Progress ring rendered via View trick */}
      <ProgressRing progress={progress} />

      {/* SOS Button */}
      <View style={styles.button}>
        <TypographyText variant="display" color="#FFF" style={styles.sosText}>
          {status === 'countdown' ? '3' : 'SOS'}
        </TypographyText>
        <TypographyText variant="caption" color="rgba(255,255,255,0.7)" style={styles.hintText}>
          Hold 3 sec
        </TypographyText>
      </View>
    </Pressable>
  );
};

// SVG-free progress ring using a rotating View with a border trick
const ProgressRing = ({ progress }: { progress: Animated.SharedValue<number> }) => {
  const topHalfStyle = useAnimatedStyle(() => {
    const p = progress.value;
    // First half: 0..0.5 → 0..180deg, after 0.5: stay at 180
    const deg = Math.min(p * 2, 1) * 180;
    return { transform: [{ rotate: `${deg}deg` }] };
  });

  const bottomHalfStyle = useAnimatedStyle(() => {
    const p = progress.value;
    // Second half only: 0.5..1 → 0..180deg
    const deg = Math.max(0, (p - 0.5) * 2) * 180;
    return {
      transform: [{ rotate: `${deg}deg` }],
      opacity: p >= 0.5 ? 1 : 0,
    };
  });

  return (
    <View style={styles.ringWrapper} pointerEvents="none">
      {/* Top half clipping container */}
      <View style={styles.halfClipTop}>
        <Animated.View style={[styles.halfCircle, styles.halfCircleTop, topHalfStyle]} />
      </View>
      {/* Bottom half — only visible after 50% */}
      <View style={styles.halfClipBottom}>
        <Animated.View style={[styles.halfCircle, styles.halfCircleBottom, bottomHalfStyle]} />
      </View>
    </View>
  );
};

const RING_SIZE = SIZE + 20; // slightly larger than button

const styles = StyleSheet.create({
  container: {
    width: RING_SIZE,
    height: RING_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: Colors.emergency,
  },
  ringWrapper: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
  },
  halfClipTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: RING_SIZE,
    height: RING_SIZE / 2,
    overflow: 'hidden',
  },
  halfClipBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: RING_SIZE,
    height: RING_SIZE / 2,
    overflow: 'hidden',
  },
  halfCircle: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: STROKE + 2,
    borderColor: '#FF6B6B',
    backgroundColor: 'transparent',
  },
  halfCircleTop: {
    transformOrigin: `${RING_SIZE / 2}px ${RING_SIZE / 2}px`,
  },
  halfCircleBottom: {
    position: 'absolute',
    bottom: 0,
    transformOrigin: `${RING_SIZE / 2}px 0px`,
  },
  button: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: Colors.emergency,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,
    shadowColor: Colors.emergency,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  sosText: {
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: 4,
  },
  hintText: {
    marginTop: 4,
    letterSpacing: 1,
  },
});
