import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
  Animated,
  StatusBar,
  FlatList,
  Modal,
  Switch,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// --- MOCK DATA ---
const books = [
  {
    id: '1',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg',
    rating: 4.29,
    genre: 'Philosophy',
    pages: 163,
    year: 1813,
    language: 'Portuguese',
    summary: 'Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work "her own darling child" and its vivacious heroine, Elizabeth Bennet, "as delightful a creature as ever appeared in print." The romantic clash between the opinionated Elizabeth and her proud beau, Mr. Darcy, is a splendid performance of civilized sparring. And Jane Austens radiant wit sparkles as her characters dance a delicate quadrille of flirtation and intrigue, making this book the most superb comedy of manners of Regency England.',
    reviews: 128450,
    price: '$0.99',
    isWishlisted: false,
  },
  {
    id: '2',
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1382846449i/7144.jpg',
    rating: 4.28,
    genre: 'Classic Fiction',
    pages: 281,
    year: 1866,
    language: 'English',
    summary: 'Raskolnikov, a destitute and desperate former student, wanders through the slums of St Petersburg and commits a random murder without remorse or regret. He imagines himself to be a great man, a Napoleon: acting for a higher purpose beyond conventional moral law. But as he embarks on a dangerous game of cat and mouse with a suspicious police investigator, Raskolnikov is pursued by the growing voice of his conscience and finds the noose of his own guilt tightening around his neck. Only Sonya, a downtrodden sex worker, can offer the chance of redemption.',
    reviews: 95320,
    price: '$4.99',
    isWishlisted: true,
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1532714506i/40961427.jpg',
    rating: 4.9,
    genre: 'Dystopian',
    pages: 328,
    year: 1949,
    language: 'English',
    summary: 'Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, the book offers political satirist George Orwells nightmarish vision of a totalitarian, bureaucratic world and one poor stiffs attempt to find individuality. The brilliance of the novel is Orwells prescience of modern life—the ubiquity of television, the distortion of the language—and his ability to construct such a thorough version of hell. Required reading for students since it was published, it ranks among the most terrifying novels ever written.',
    reviews: 156780,
    price: '$3.99',
    isWishlisted: false,
  },
  {
    id: '4',
    title: 'Hamlet',
    author: 'William Shakespeare',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1351051208i/1420.jpg',
    rating: 4.6,
    genre: 'Classic',
    pages: 180,
    year: 1601,
    language: 'English',
    summary: 'Among Shakespeares plays, "Hamlet" is considered by many his masterpiece. Among actors, the role of Hamlet, Prince of Denmark, is considered the jewel in the crown of a triumphant theatrical career. Now Kenneth Branagh plays the leading role and co-directs a brillant ensemble performance. Three generations of legendary leading actors, many of whom first assembled for the Oscar-winning film "Henry V", gather here to perform the rarely heard complete version of the play. This clear, subtly nuanced, stunning dramatization, presented by The Renaissance Theatre Company in association with "Bbc" Broadcasting, features such luminaries as Sir John Gielgud, Derek Jacobi, Emma Thompson and Christopher Ravenscroft. It combines a full cast with stirring music and sound effects to bring this magnificent Shakespearen classic vividly to life. Revealing new riches with each listening, this production of "Hamlet" is an invaluable aid for students, teachers and all true lovers of Shakespeare - a recording to be treasured for decades to come.',
    reviews: 87650,
    price: '$11.99',
    isWishlisted: true,
  },
  {
    id: '5',
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel García Márquez',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327881361i/320.jpg',
    rating: 4.8,
    genre: 'Classic',
    pages: 432,
    year: 1813,
    language: 'English',
    summary: 'Honderd jaar eenzaamheid verhaalt van het exotische en tragische geslacht Buendía, dat de stad Macondo op het moeras veroverde, ruim een eeuw voordat de stad haar apocalyptische einde vindt. Natuurrampen, exploitatie en meedogenloze oorlogen bepalen de geschiedenis van de Buendía’s, waarvan de stichter José Arcadio, een alles beproevende amateur-alchemist, onder meer bewijst dat de wereld rond is: een zinvolle, zij het late ontdekking.',
    reviews: 201340,
    price: '$9.99',
    isWishlisted: false,
  },
  {
    id: '6',
    title: 'The Odyssey',
    author: 'Homer',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1711957706i/1381.jpg',
    rating: 4.7,
    genre: 'Classics',
    pages: 598,
    year: 1965,
    language: 'English',
    summary: 'So begins Robert Fagles magnificent translation of the Odyssey. If the Iliad is the worlds greatest war epic, then the Odyssey is literatures grandest evocation of everymans journey though life. Odysseus reliance on his wit and wiliness for survival in his encounters with divine and natural forces, during his ten-year voyage home to Ithaca after the Trojan War, is at once a timeless human story and an individual test of moral endurance.',
    reviews: 134560,
    price: '$16.99',
    isWishlisted: false,
  },
  {
    id: '7',
    title: 'The Stranger',
    author: 'Albert Camus',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1738704267i/49552.jpg',
    rating: 4.03,
    genre: 'Classics',
    pages: 688,
    year: 1942,
    language: 'English',
    summary: 'Published in 1942 by French author Albert Camus, The Stranger has long been considered a classic of twentieth-century literature. Le Monde ranks it as number one on its "100 Books of the Century" list. Through this story of an ordinary man unwittingly drawn into a senseless murder on a sundrenched Algerian beach, Camus explores what he termed "the nakedness of man faced with the absurd."',
    reviews: 134560,
    price: '$11.99',
    isWishlisted: false,
  },
  {
    id: '8',
    title: 'The Brothers Karamazov',
    author: 'Fyodor Dostoevsky',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1427728126i/4934.jpg',
    rating: 4.38,
    genre: 'Classics',
    pages: 648,
    year: 1880,
    language: 'English',
    summary: 'The Brothers Karamazov is a murder mystery, a courtroom drama, and an exploration of erotic rivalry in a series of triangular love affairs involving the “wicked and sentimental” Fyodor Pavlovich Karamazov and his three sons―the impulsive and sensual Dmitri; the coldly rational Ivan; and the healthy, red-cheeked young novice Alyosha. Through the gripping events of their story, Dostoevsky portrays the whole of Russian life, is social and spiritual striving, in what was both the golden age and a tragic turning point in Russian culture.',
    reviews: 134560,
    price: '$0.99',
    isWishlisted: false,
  },
  {
    id: '9',
    title: 'The Love Hypothesis',
    author: 'Ali Hazelwood ',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1747519081i/56732449.jpg',
    rating: 4.11,
    genre: 'Romance',
    pages: 748,
    year: 2021,
    language: 'English',
    summary: 'When a fake relationship between scientists meets the irresistible force of attraction, it throws one womans carefully calculated theories on love into chaos As a third-year Ph.D. candidate, Olive Smith doesnt believe in lasting romantic relationships—but her best friend does, and thats what got her into this situation. Convincing Anh that Olive is dating and well on her way to a happily ever after was always going to take more than hand-wavy Jedi mind tricks: Scientists require proof. So, like any self-respecting biologist, Olive panics and kisses the first man she sees.That man is none other than Adam Carlsen, a young hotshot professor—and well-known ass. Which is why Olive is positively floored when Stanfords reigning lab tyrant agrees to keep her charade a secret and be her fake boyfriend. And when a big science conference goes haywire, putting Olives career on the Bunsen burner, Adam surprises her again with his unyielding support and even more unyielding six-pack abs.Suddenly their little experiment feels dangerously close to combustion. And Olive discovers that the only thing more complicated than a hypothesis on love is putting her own heart under the microscope.',
    reviews: 176319,
    price: '$12.99',
    isWishlisted: false,
  },
   {
    id: '10',
    title: 'Pride and Prejudice (Hardcover)',
    author: 'Jane Austen',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1681804503i/129915654.jpg',
    rating: 4.29,
    genre: 'Romance',
    pages: 438,
    year: 1813,
    language: 'English',
    summary: 'Pride and Prejudice has charmed generations of readers for more than two centuries. Jane Austens much-adapted novel is famed for its witty, spirited heroine, sensational romances, and deft remarks on the triumphs and pitfalls of social convention. Author Jane Austen (1775-1817) was an English novelist whose works of social realism achieved unprecedented critical and popular success, though Austen herself remained an anonymous writer throughout her life.',
    reviews: 136319,
    price: '$0.99',
    isWishlisted: false,
  },
];



// --- UTILITY FUNCTIONS ---
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const hasMinLength = password.length >= 4;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return { hasMinLength, hasUpperCase, hasSymbol, isValid: hasMinLength && hasUpperCase && hasSymbol };
};

// --- COMPONENTS ---

const CustomInput = ({ 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false, 
  error = '',
  keyboardType = 'default',
  autoCapitalize = 'none',
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <View style={[styles.inputWrapper, isFocused && styles.inputFocused, error && styles.inputError]}>
        {icon && <Text style={styles.inputIcon}>{icon}</Text>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const PasswordStrengthIndicator = ({ password }) => {
  const validation = validatePassword(password);
  
  return (
    <View style={styles.passwordStrengthContainer}>
      <Text style={styles.passwordStrengthTitle}>Password Requirements:</Text>
      <View style={styles.passwordRequirement}>
        <Text style={[styles.requirementIcon, validation.hasMinLength && styles.requirementMet]}>
          {validation.hasMinLength ? '✓' : '✗'}
        </Text>
        <Text style={[styles.requirementText, validation.hasMinLength && styles.requirementMet]}>
          At least 4 characters
        </Text>
      </View>
      <View style={styles.passwordRequirement}>
        <Text style={[styles.requirementIcon, validation.hasUpperCase && styles.requirementMet]}>
          {validation.hasUpperCase ? '✓' : '✗'}
        </Text>
        <Text style={[styles.requirementText, validation.hasUpperCase && styles.requirementMet]}>
          One uppercase letter
        </Text>
      </View>
      <View style={styles.passwordRequirement}>
        <Text style={[styles.requirementIcon, validation.hasSymbol && styles.requirementMet]}>
          {validation.hasSymbol ? '✓' : '✗'}
        </Text>
        <Text style={[styles.requirementText, validation.hasSymbol && styles.requirementMet]}>
          One special character
        </Text>
      </View>
    </View>
  );
};

const AnimatedButton = ({ title, onPress, disabled = false, style = {} }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        style={[styles.animatedButton, disabled && styles.disabledButton, style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        <Text style={[styles.animatedButtonText, disabled && styles.disabledButtonText]}>
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// --- AUTHENTICATION SCREENS ---

const SignInScreen = ({ onSignIn, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    let hasError = false;

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address with @ symbol');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (!hasError) {
      onSignIn();
    }
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      <ScrollView contentContainerStyle={styles.authScrollContent}>
        <View style={styles.authCard}>
          <View style={styles.authHeader}>
            <Text style={styles.authTitle}>Welcome Back</Text>
            <Text style={styles.authSubtitle}>Sign in to continue your literary journey</Text>
          </View>

          <View style={styles.formContainer}>
            <CustomInput
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError('');
              }}
              keyboardType="email-address"
              error={emailError}
              icon="📧"
            />

            <CustomInput
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError('');
              }}
              secureTextEntry
              error={passwordError}
              icon="🔒"
            />

            <View style={styles.rememberMeContainer}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                thumbColor={rememberMe ? '#4F46E5' : '#f4f3f4'}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
              />
              <Text style={styles.rememberMeText}>Remember me</Text>
            </View>

            <AnimatedButton
              title="Sign In"
              onPress={handleSignIn}
            />

            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.authSwitch}>
            <Text style={styles.authSwitchText}>Don't have an account? </Text>
            <TouchableOpacity onPress={onSwitchToSignUp}>
              <Text style={styles.authSwitchLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SignUpScreen = ({ onSignUp, onSwitchToSignIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordReqs, setShowPasswordReqs] = useState(false);

  const handleSignUp = () => {
    let hasError = false;

    if (!name.trim()) {
      setNameError('Full name is required');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address with @ symbol');
      hasError = true;
    } else {
      setEmailError('');
    }

    const passwordValidation = validatePassword(password);
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (!passwordValidation.isValid) {
      setPasswordError('Password must meet all requirements');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (!hasError) {
      onSignUp();
    }
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      <ScrollView contentContainerStyle={styles.authScrollContent}>
        <View style={styles.authCard}>
          <View style={styles.authHeader}>
            <Text style={styles.authTitle}>Create Account</Text>
            <Text style={styles.authSubtitle}>Join thousands of book lovers</Text>
          </View>

          <View style={styles.formContainer}>
            <CustomInput
              placeholder="Enter your full name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setNameError('');
              }}
              autoCapitalize="words"
              error={nameError}
              icon="👤"
            />

            <CustomInput
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError('');
              }}
              keyboardType="email-address"
              error={emailError}
              icon="📧"
            />

            <CustomInput
              placeholder="Create a password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError('');
                setShowPasswordReqs(text.length > 0);
              }}
              secureTextEntry
              error={passwordError}
              icon="🔒"
            />

            {showPasswordReqs && <PasswordStrengthIndicator password={password} />}

            <AnimatedButton
              title="Create Account"
              onPress={handleSignUp}
              disabled={!validatePassword(password).isValid || !validateEmail(email) || !name.trim()}
            />
          </View>

          <View style={styles.authSwitch}>
            <Text style={styles.authSwitchText}>Already have an account? </Text>
            <TouchableOpacity onPress={onSwitchToSignIn}>
              <Text style={styles.authSwitchLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- MAIN APP SCREENS ---

const BookCard = ({ book, onPress, onWishlistToggle }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        style={styles.bookCard}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.bookImageContainer}>
          <Image source={{ uri: book.cover }} style={styles.bookCover} />
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={() => onWishlistToggle(book.id)}
          >
            <Text style={styles.wishlistIcon}>
              {book.isWishlisted ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
          <Text style={styles.bookAuthor} numberOfLines={1}>{book.author}</Text>
          <View style={styles.bookMeta}>
            <View style={styles.ratingContainer}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.rating}>{book.rating}</Text>
            </View>
            <Text style={styles.bookPrice}>{book.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const HomeScreen = ({ onSelectBook, onSignOut }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [bookList, setBookList] = useState(books);
  
  const genres = ['All', 'Philosophy', 'Classic Fiction', 'Dystopian', 'Classic', 'Romance',];

  const filteredBooks = bookList.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleWishlistToggle = (bookId) => {
    setBookList(prevBooks =>
      prevBooks.map(book =>
        book.id === bookId ? { ...book, isWishlisted: !book.isWishlisted } : book
      )
    );
  };

  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      {/* Enhanced Header */}
      <View style={styles.homeHeader}>
        <View>
          <Text style={styles.homeTitle}>Literary Hub</Text>
          <Text style={styles.homeSubtitle}>Discover your next great read</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={onSignOut}>
          <Text style={styles.profileIcon}>👤</Text>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search books or authors..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Genre Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreContainer}>
        {genres.map(genre => (
          <TouchableOpacity
            key={genre}
            style={[styles.genreTag, selectedGenre === genre && styles.selectedGenreTag]}
            onPress={() => setSelectedGenre(genre)}
          >
            <Text style={[styles.genreText, selectedGenre === genre && styles.selectedGenreText]}>
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Books Grid */}
      <FlatList
        data={filteredBooks}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => onSelectBook(item)}
            onWishlistToggle={handleWishlistToggle}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.booksContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const BookDetailScreen = ({ book, onBack }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.detailContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      {/* Animated Header */}
      <Animated.View style={[styles.detailHeader, { opacity: headerOpacity }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.detailHeaderTitle} numberOfLines={1}>{book.title}</Text>
        <View style={styles.headerSpacer} />
      </Animated.View>

      <Animated.ScrollView
        style={styles.detailScrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <TouchableOpacity style={styles.floatingBackButton} onPress={onBack}>
            <Text style={styles.backIcon}>←</Text>
            <Text style={styles.backText}>Library</Text>
          </TouchableOpacity>
          
          <View style={styles.bookHero}>
            <Image source={{ uri: book.cover }} style={styles.herBookCover} />
            <View style={styles.heroInfo}>
              <Text style={styles.heroBookTitle}>{book.title}</Text>
              <Text style={styles.heroBookAuthor}>{book.author}</Text>
              
              <View style={styles.heroMeta}>
                <View style={styles.heroRating}>
                  <Text style={styles.heroStarIcon}>⭐</Text>
                  <Text style={styles.heroRatingText}>{book.rating}</Text>
                  {/* Fixed: Add null check for reviews */}
                  <Text style={styles.heroReviewCount}>
                    ({book.reviews ? book.reviews.toLocaleString() : '0'})
                  </Text>
                </View>
                <Text style={styles.heroPrice}>{book.price}</Text>
              </View>

              <View style={styles.bookDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Genre</Text>
                  <Text style={styles.detailValue}>{book.genre}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Pages</Text>
                  <Text style={styles.detailValue}>{book.pages}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Year</Text>
                  <Text style={styles.detailValue}>{book.year}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>🤍 Wishlist</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>About This Book</Text>
          {/* Fixed: Use numberOfLines prop on Text component, not in styles */}
          <Text 
            style={styles.descriptionText}
            numberOfLines={isDescriptionExpanded ? undefined : 4}
          >
            {book.summary}
          </Text>
          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          >
            <Text style={styles.expandButtonText}>
              {isDescriptionExpanded ? 'Show Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Reviews & Ratings</Text>
          <View style={styles.reviewsSummary}>
            <View style={styles.ratingOverview}>
              <Text style={styles.overallRating}>{book.rating}</Text>
              <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
              {/* Fixed: Add null check for reviews */}
              <Text style={styles.reviewCountText}>
                {book.reviews ? book.reviews.toLocaleString() : '0'} reviews
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState('signIn');
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSignIn = () => setIsAuthenticated(true);
  const handleSignUp = () => setIsAuthenticated(true);
  const handleSignOut = () => {
    setIsAuthenticated(false);
    setSelectedBook(null);
  };

  const handleSelectBook = (book) => setSelectedBook(book);
  const handleBackToHome = () => setSelectedBook(null);

  if (!isAuthenticated) {
    return authScreen === 'signIn' ? (
      <SignInScreen 
        onSignIn={handleSignIn} 
        onSwitchToSignUp={() => setAuthScreen('signUp')} 
      />
    ) : (
      <SignUpScreen 
        onSignUp={handleSignUp} 
        onSwitchToSignIn={() => setAuthScreen('signIn')} 
      />
    );
  }

  return selectedBook ? (
    <BookDetailScreen book={selectedBook} onBack={handleBackToHome} />
  ) : (
    <HomeScreen onSelectBook={handleSelectBook} onSignOut={handleSignOut} />
  );
}

// --- COMPLETE STYLES ---
const styles = StyleSheet.create({
  // Auth Styles
  authContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  authScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  authCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputFocused: {
    borderColor: '#4F46E5',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#374151',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
  },
  passwordStrengthContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  passwordStrengthTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  passwordRequirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  requirementIcon: {
    fontSize: 14,
    color: '#EF4444',
    marginRight: 8,
    width: 16,
  },
  requirementMet: {
    color: '#10B981',
  },
  requirementText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberMeText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  animatedButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
  animatedButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
  forgotPasswordButton: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '500',
  },
  authSwitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authSwitchText: {
    fontSize: 16,
    color: '#6B7280',
  },
  authSwitchLink: {
    fontSize: 16,
    color: '#4F46E5',
    fontWeight: '600',
  },

  // Home Screen Styles
  homeContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  homeHeader: {
    backgroundColor: '#1F2937',
    paddingTop: 70,
    paddingBottom: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  homeSubtitle: {
    fontSize: 14,
    color: '#D1D5DB',
    marginTop: 4,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  profileIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  genreContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  genreTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  selectedGenreTag: {
    backgroundColor: '#4F46E5',
  },
  genreText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  selectedGenreText: {
    color: '#FFFFFF',
  },
  booksContainer: {
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 100,
  },
  bookCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 10,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  bookImageContainer: {
    position: 'relative',
  },
  bookCover: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistIcon: {
    fontSize: 16,
  },
  bookInfo: {
    padding: 12,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 22,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  bookMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  bookPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },

  // Book Detail Styles
  detailContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  detailHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1F2937',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
  detailHeaderTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 40,
  },
  detailScrollContainer: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#1F2937',
    paddingTop: 60,
    paddingBottom: 40,
    position: 'relative',
  },
  floatingBackButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  bookHero: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  herBookCover: {
    width: 140,
    height: 200,
    borderRadius: 12,
    marginRight: 20,
  },
  heroInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heroBookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 32,
  },
  heroBookAuthor: {
    fontSize: 18,
    color: '#D1D5DB',
    marginBottom: 16,
  },
  heroMeta: {
    marginBottom: 20,
  },
  heroRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  heroStarIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  heroRatingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  heroReviewCount: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  heroPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34D399',
  },
  bookDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
  primaryButton: {
    flex: 2,
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  descriptionSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
    textAlign: 'justify',
  },
  descriptionCollapsed: {
    numberOfLines: 4,
  },
  expandButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  expandButtonText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewsSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
  },
  reviewsSummary: {
    alignItems: 'center',
  },
  ratingOverview: {
    alignItems: 'center',
  },
  overallRating: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  ratingStars: {
    fontSize: 24,
    marginVertical: 8,
  },
  reviewCountText: {
    fontSize: 16,
    color: '#6B7280',
  },
  bottomPadding: {
    height: 40,
  },
});